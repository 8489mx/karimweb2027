<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Usually the client just removes the token. 
    // Since Hostinger uses simple auth here, we just return success.
    echo json_encode(['success' => true]);
}
?>
