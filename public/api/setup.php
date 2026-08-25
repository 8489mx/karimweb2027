<?php
require_once 'config.php';
require_once 'db.php';

// ONLY RUN THIS ONCE to set your admin password, THEN DELETE THIS FILE!

$username = 'admin';
$password = 'admin123'; // Change this to your desired strong password
$hashed = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES ('admin_user', ?) ON DUPLICATE KEY UPDATE setting_value = ?");
    $stmt->execute([$username, $username]);

    $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES ('admin_pass', ?) ON DUPLICATE KEY UPDATE setting_value = ?");
    $stmt->execute([$hashed, $hashed]);

    echo "Admin credentials configured successfully! PLEASE DELETE THIS FILE NOW (setup.php).";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
