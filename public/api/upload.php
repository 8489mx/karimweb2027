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

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    // 5MB limit
    if ($_FILES['image']['size'] > 5 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['error' => 'File size exceeds 5MB']);
        exit;
    }

    $tmpPath = $_FILES['image']['tmp_name'];
    
    // Verify true MIME type via finfo
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($tmpPath);
    
    $allowed_mimes = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/gif'  => 'gif',
        'image/webp' => 'webp'
    ];
    
    if (!array_key_exists($mime, $allowed_mimes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type']);
        exit;
    }
    
    $ext = $allowed_mimes[$mime];
    $target_dir = "../uploads/";
    
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $new_filename = time() . '_' . bin2hex(random_bytes(8)) . '.' . $ext;
    $target_file = $target_dir . $new_filename;
    
    if (move_uploaded_file($tmpPath, $target_file)) {
        echo json_encode(['url' => '/uploads/' . $new_filename]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to move uploaded file']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded or upload error']);
}
