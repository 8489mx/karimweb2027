<?php
require_once 'config.php';
require_once 'db.php';
require_once 'jwt.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

requireAdminAuth($pdo);

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['username']) && isset($input['newPassword'])) {
    $username = $input['username'];
    $newPassHash = password_hash($input['newPassword'], PASSWORD_DEFAULT);
    
    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare("UPDATE settings SET setting_value = ? WHERE setting_key = 'admin_user'");
        $stmt->execute([$username]);
        
        $stmt = $pdo->prepare("UPDATE settings SET setting_value = ? WHERE setting_key = 'admin_pass'");
        $stmt->execute([$newPassHash]);
        
        // Invalidate old tokens by updating jwt_version
        $stmt = $pdo->prepare("UPDATE settings SET setting_value = setting_value + 1 WHERE setting_key = 'jwt_version'");
        $stmt->execute();
        
        $pdo->commit();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update credentials']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Missing username or new password']);
}
