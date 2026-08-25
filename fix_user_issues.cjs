const fs = require('fs');

// 1. Fix cors.php
let corsContent = fs.readFileSync('public/api/cors.php', 'utf8');
corsContent = corsContent.replace(/your-domain\.com/g, 'karimzakaria.com');
fs.writeFileSync('public/api/cors.php', corsContent);

// 2. Fix config.php to turn off errors
let configContent = fs.readFileSync('public/api/config.php', 'utf8');
if (!configContent.includes('display_errors')) {
    configContent = configContent.replace(/<\?php/, "<?php\n// Disable error display for production\nini_set('display_errors', '0');\nerror_reporting(0);\n");
    fs.writeFileSync('public/api/config.php', configContent);
}

// 3. Fix orders.php to require auth for ALL GET requests
let ordersContent = fs.readFileSync('public/api/orders.php', 'utf8');
ordersContent = ordersContent.replace(/if \(\$_SERVER\['REQUEST_METHOD'\] === 'GET'\) \{([\s\S]*?)if \(isset\(\$_GET\['id'\]\)\) \{([\s\S]*?)\} else \{([\s\S]*?)if \(!isAuthorized\(\$pdo\)\) \{([\s\S]*?)\} elseif/m, `if ($_SERVER['REQUEST_METHOD'] === 'GET') {
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
elseif`);
fs.writeFileSync('public/api/orders.php', ordersContent);
