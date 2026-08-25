<?php
// Note: config.php must be required before this file to ensure JWT_SECRET is available

function base64UrlEncode($data) {
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
}

function base64UrlDecode($data) {
    $remainder = strlen($data) % 4;
    if ($remainder !== 0) {
        $data .= str_repeat('=', 4 - $remainder);
    }
    return base64_decode(str_replace(['-', '_'], ['+', '/'], $data));
}

function generateJWT($payload, $secret) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload['exp'] = time() + JWT_EXPIRATION;
    
    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode(json_encode($payload));
    
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
    $base64UrlSignature = base64UrlEncode($signature);
    
    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

function verifyJWT($jwt, $secret, $pdo) {
    $tokenParts = explode('.', $jwt);
    if (count($tokenParts) != 3) {
        return false;
    }
    
    $header = base64UrlDecode($tokenParts[0]);
    $payload = base64UrlDecode($tokenParts[1]);
    $signature_provided = $tokenParts[2];
    
    $signature = hash_hmac('sha256', $tokenParts[0] . "." . $tokenParts[1], $secret, true);
    $base64UrlSignature = base64UrlEncode($signature);
    
    // Strict timing-attack safe comparison
    if (!hash_equals($base64UrlSignature, $signature_provided)) {
        return false;
    }
    
    $payloadData = json_decode($payload, true);
    if (isset($payloadData['exp']) && $payloadData['exp'] < time()) {
        return false; // expired
    }
    
    // Check auth_version to invalidate old tokens after password change
    if (isset($payloadData['version'])) {
        $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'jwt_version'");
        $stmt->execute();
        $currentVersion = $stmt->fetchColumn();
        if ($currentVersion !== false && $currentVersion !== $payloadData['version']) {
            return false; // token is from before password change
        }
    }

    return $payloadData;
}

function getBearerToken() {
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }
    return null;
}

function requireAdminAuth($pdo) {
    $token = getBearerToken();
    if (!$token) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized - No token']);
        exit;
    }
    $payload = verifyJWT($token, JWT_SECRET, $pdo);
    if (!$payload) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized - Invalid or expired token']);
        exit;
    }
    return $payload;
}
