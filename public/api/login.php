<?php
require_once 'config.php';
require_once 'db.php';
require_once 'jwt.php';
require_once 'rate_limit.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$ip = $_SERVER['REMOTE_ADDR'];
if (!checkRateLimit($pdo, $ip, 'login', 5, 15)) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many login attempts. Please try again in 15 minutes.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['username']) && isset($input['password'])) {
    $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'admin_user'");
    $stmt->execute();
    $adminUser = $stmt->fetchColumn();
    
    $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'admin_pass'");
    $stmt->execute();
    $adminPassHash = $stmt->fetchColumn();
    
    $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'jwt_version'");
    $stmt->execute();
    $jwtVersion = $stmt->fetchColumn() ?: '1';

    if ($input['username'] === $adminUser && password_verify($input['password'], $adminPassHash)) {
        clearRateLimit($pdo, $ip, 'login');
        
        $payload = [
            'admin' => true,
            'version' => $jwtVersion
        ];
        
        $token = generateJWT($payload, JWT_SECRET);
        echo json_encode(['success' => true, 'token' => $token]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Missing credentials']);
}
