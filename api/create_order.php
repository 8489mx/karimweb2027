<?php
// api/create_order.php
require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$customer_name = sanitizeInput($data['customer_name'] ?? '');
$phone_number = sanitizeInput($data['phone_number'] ?? '');
$phone_country_code = sanitizeInput($data['phone_country_code'] ?? '');
$residence_country = sanitizeInput($data['residence_country'] ?? '');
$detected_country = sanitizeInput($data['detected_country'] ?? '');
$package_code = sanitizeInput($data['package_code'] ?? '');
$duration_code = sanitizeInput($data['duration_code'] ?? '');

// Basic Validation
if (empty($customer_name) || empty($phone_number) || empty($residence_country) || empty($package_code) || empty($duration_code)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

try {
    // 1. Fetch package pricing from database
    $stmt = $pdo->prepare("SELECT * FROM package_prices WHERE package_code = ? AND duration_code = ? AND country_code = ? AND is_active = 1 LIMIT 1");
    $stmt->execute([$package_code, $duration_code, $residence_country]);
    $package = $stmt->fetch();

    if (!$package) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid package or country combination, or package is inactive.']);
        exit;
    }

    // 2. Calculate values
    $base_duration = (int)$package['base_duration_months'];
    $free_months = (int)$package['free_months'];
    $total_duration = $base_duration + $free_months;
    $final_amount = $package['final_amount'];
    $currency_code = $package['currency_code'];

    // 3. Country Review Flag
    $country_review_required = 0;
    // Simple logic: if detected IP country is different from residence country (and detected is not empty)
    if (!empty($detected_country) && $detected_country !== $residence_country) {
        $country_review_required = 1;
    }

    // 4. Generate Unique Order Number: KZ-YYMMDD-XXXX
    $datePart = date('ymd');
    $randomPart = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
    $order_number = "KZ-{$datePart}-{$randomPart}";
    
    // Ensure uniqueness (simple retry loop)
    $isUnique = false;
    $maxRetries = 5;
    while (!$isUnique && $maxRetries > 0) {
        $check = $pdo->prepare("SELECT id FROM orders WHERE order_number = ?");
        $check->execute([$order_number]);
        if ($check->rowCount() == 0) {
            $isUnique = true;
        } else {
            $randomPart = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
            $order_number = "KZ-{$datePart}-{$randomPart}";
            $maxRetries--;
        }
    }

    // 5. Insert Order
    $insertStmt = $pdo->prepare("
        INSERT INTO orders (
            order_number, customer_name, phone_number, phone_country_code, 
            residence_country, detected_country, package_code, duration_code, 
            base_duration_months, free_months, total_duration_months, 
            currency_code, final_amount, status, country_review_required
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending_payment', ?)
    ");
    
    $insertStmt->execute([
        $order_number, $customer_name, $phone_number, $phone_country_code,
        $residence_country, $detected_country, $package_code, $duration_code,
        $base_duration, $free_months, $total_duration,
        $currency_code, $final_amount, $country_review_required
    ]);

    // 6. Return success
    echo json_encode([
        'success' => true,
        'order_number' => $order_number
    ]);

} catch (\PDOException $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An internal error occurred while processing your order.']);
}
?>
