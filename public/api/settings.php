<?php
require_once 'config.php';
require_once 'db.php';
require_once 'jwt.php';

header('Content-Type: application/json');

function isAuthorized($pdo) {
    $token = getBearerToken();
    if (!$token) return false;
    return verifyJWT($token, JWT_SECRET, $pdo) !== false;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT setting_key, setting_value FROM settings");
    $settings = [];
    while ($row = $stmt->fetch()) {
        // Strip sensitive info
        if (in_array($row['setting_key'], ['admin_user', 'admin_pass', 'jwt_version'])) {
            continue; 
        }
        $settings[$row['setting_key']] = json_decode($row['setting_value'], true) ?? $row['setting_value'];
    }
    
    // Add isAdmin flag based on valid token
    $settings['isAdmin'] = isAuthorized($pdo);
    echo json_encode($settings);
} 
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    requireAdminAuth($pdo);
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input) {
        $pdo->beginTransaction();
        try {
            $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
            
            foreach ($input as $key => $value) {
                // Protect admin credentials and version from being overwritten via generic settings save
                if (in_array($key, ['admin_user', 'admin_pass', 'isAdmin', 'jwt_version'])) {
                    continue;
                }
                $val = is_array($value) ? json_encode($value) : $value;
                $stmt->execute([$key, $val]);
            }
            $pdo->commit();
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            $pdo->rollBack();
            http_response_code(500);
            echo json_encode(['error' => 'Failed to save settings']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
    }
}
