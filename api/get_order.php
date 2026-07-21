<?php
// api/get_order.php
require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$order_number = $_GET['order_number'] ?? '';

if (empty($order_number)) {
    http_response_code(400);
    echo json_encode(['error' => 'Order number is required']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT order_number, customer_name, phone_number, residence_country, package_code, duration_code, base_duration_months, free_months, total_duration_months, currency_code, final_amount, status, country_review_required, created_at FROM orders WHERE order_number = ? LIMIT 1");
    $stmt->execute([sanitizeInput($order_number)]);
    $order = $stmt->fetch();

    if (!$order) {
        http_response_code(404);
        echo json_encode(['error' => 'Order not found']);
        exit;
    }

    echo json_encode([
        'success' => true,
        'order' => $order
    ]);

} catch (\PDOException $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An internal error occurred']);
}
?>
