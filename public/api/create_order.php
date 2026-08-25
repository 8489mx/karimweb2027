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
if (!checkRateLimit($pdo, $ip, 'create_order', 10, 15)) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many orders created. Please try again later.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['customer_name'], $input['phone'], $input['country'], $input['package_code'], $input['duration'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Get pricing from settings
$stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'pricing'");
$stmt->execute();
$pricingStr = $stmt->fetchColumn();
$pricing = $pricingStr ? json_decode($pricingStr, true) : null;

if (!$pricing) {
    http_response_code(500);
    echo json_encode(['error' => 'Pricing configuration error on server']);
    exit;
}

// Map country codes
$countryMapping = [
    'EG' => 'EG',
    'SA' => 'SA',
    'AE' => 'AE',
    'KW' => 'KW',
    'QA' => 'QA',
    'BH' => 'BH'
];

$countryCode = isset($countryMapping[$input['country']]) ? $countryMapping[$input['country']] : 'other';

if (!isset($pricing[$countryCode])) {
    $countryCode = 'other'; // Fallback again just in case
}
if (!isset($pricing[$countryCode][$input['package_code']][$input['duration']])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid package or duration']);
    exit;
}

$packageInfo = $pricing[$countryCode][$input['package_code']][$input['duration']];
$basePrice = (float)$packageInfo['finalAmount'];
$currency = $pricing[$countryCode]['currency'] ?? 'USD';

// Handle promo
$discount = 0;
if (!empty($input['promo_code'])) {
    $stmt = $pdo->prepare("SELECT discount_percentage, is_active, expires_at FROM coupons WHERE code = ?");
    $stmt->execute([$input['promo_code']]);
    $coupon = $stmt->fetch();
    
    if ($coupon && $coupon['is_active'] && (!$coupon['expires_at'] || strtotime($coupon['expires_at']) > time())) {
        $discount = (float)$coupon['discount_percentage'];
    }
}

$finalPrice = $basePrice * (1 - ($discount / 100));
$orderId = "ORD-" . time() . rand(1000, 9999);

try {
    $stmt = $pdo->prepare("INSERT INTO orders (id, customer_name, phone, country, package_name, package_code, duration, amount, currency, payment_method, status, date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $orderId,
        $input['customer_name'],
        $input['phone'],
        $input['country'],
        $input['package_name'], // e.g., "البرنامج الذهبي"
        $input['package_code'], // e.g., "elite"
        $input['duration'], // e.g., "3m"
        $finalPrice,
        $currency,
        $input['payment_method'] ?? 'cash',
        'pending',
        date('Y-m-d H:i:s'),
        $input['notes'] ?? ''
    ]);
    
    echo json_encode(['success' => true, 'orderId' => $orderId, 'amount' => $finalPrice, 'currency' => $currency]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to create order']);
}
