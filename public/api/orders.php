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
    // Require authorization for ANY read operation on orders
    if (!isAuthorized($pdo)) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM orders WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $order = $stmt->fetch();
        if ($order) {
            echo json_encode($order);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Order not found']);
        }
    } else {
        $stmt = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC");
        $orders = $stmt->fetchAll();
        echo json_encode($orders);
    }
}
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    requireAdminAuth($pdo);
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($_GET['action']) && $_GET['action'] === 'update') {
        if (!isset($input['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Order ID required']);
            exit;
        }
        
        $fields = [];
        $values = [];
        $allowedFields = ['status', 'notes', 'customer_name', 'phone'];
        
        foreach ($allowedFields as $field) {
            if (isset($input[$field])) {
                $fields[] = "$field = ?";
                $values[] = $input[$field];
            }
        }
        
        if (empty($fields)) {
            echo json_encode(['success' => true]); // nothing to update
            exit;
        }
        
        $values[] = $input['id'];
        
        $stmt = $pdo->prepare("UPDATE orders SET " . implode(', ', $fields) . " WHERE id = ?");
        if ($stmt->execute($values)) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update order']);
        }
    } else {
        // Admin manually creating an order
        $orderId = "ORD-" . time() . rand(1000, 9999);
        try {
            $stmt = $pdo->prepare("INSERT INTO orders (id, customer_name, phone, country, package_name, package_code, duration, amount, currency, payment_method, status, date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $orderId,
                $input['customer_name'] ?? '',
                $input['phone'] ?? '',
                $input['country'] ?? 'EG',
                $input['package_name'] ?? '',
                $input['package_code'] ?? '',
                $input['duration'] ?? '',
                $input['amount'] ?? 0,
                $input['currency'] ?? 'USD',
                $input['payment_method'] ?? 'cash',
                $input['status'] ?? 'pending',
                date('Y-m-d H:i:s'),
                $input['notes'] ?? ''
            ]);
            echo json_encode(['success' => true, 'orderId' => $orderId]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create order']);
        }
    }
}
