<?php
// Disable error display for production
ini_set('display_errors', '0');
error_reporting(0);

// Database configuration
// Change these placeholders before deployment to Hostinger
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'karim_db';

// JWT Configuration
// CHANGE THIS SECRET BEFORE DEPLOYMENT!
define('JWT_SECRET', 'CHANGE_ME_PRODUCTION_SECRET_KEY_O123456');
define('JWT_EXPIRATION', 7 * 24 * 60 * 60); // 7 days

// Base configuration
require_once 'cors.php';
