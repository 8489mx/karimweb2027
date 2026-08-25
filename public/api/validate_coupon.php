<?php
require_once 'config.php';
require_once 'db.php';
require_once 'rate_limit.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$ip = $_SERVER['REMOTE_ADDR'];
if (!checkRateLimit($pdo, $ip, 'validate_coupon', 20, 15)) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['code'])) {
    $stmt = $pdo->prepare("SELECT discount_percentage, is_active, expires_at FROM coupons WHERE code = ?");
    $stmt->execute([$input['code']]);
    $coupon = $stmt->fetch();
    
    if ($coupon) {
        if (!$coupon['is_active']) {
            http_response_code(400);
            echo json_encode(['error' => 'Coupon is disabled']);
            exit;
        }
        if ($coupon['expires_at'] && strtotime($coupon['expires_at']) < time()) {
            http_response_code(400);
            echo json_encode(['error' => 'Coupon is expired']);
            exit;
        }
        
        echo json_encode([
            'valid' => true,
            'discount_percentage' => (float)$coupon['discount_percentage']
        ]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid coupon code']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Code is required']);
}
