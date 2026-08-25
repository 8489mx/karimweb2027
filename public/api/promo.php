<?php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['code'])) {
        $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'promos'");
        $stmt->execute();
        $promosStr = $stmt->fetchColumn();
        $promos = $promosStr ? json_decode($promosStr, true) : [];
        
        $found = null;
        foreach ($promos as $promo) {
            if (strcasecmp($promo['code'], $input['code']) === 0 && $promo['isActive']) {
                $found = $promo;
                break;
            }
        }
        
        if ($found) {
            echo json_encode($found);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'كود الخصم غير صحيح أو منتهي الصلاحية']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'كود الخصم مطلوب']);
    }
}
?>
