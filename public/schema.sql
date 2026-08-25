CREATE TABLE `settings` (
  `setting_key` varchar(50) NOT NULL,
  `setting_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `orders` (
  `id` varchar(50) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `country` varchar(10) NOT NULL,
  `package_name` varchar(100) NOT NULL,
  `package_code` varchar(50) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `payment_method` varchar(50) DEFAULT 'cash',
  `status` varchar(20) DEFAULT 'pending',
  `date` datetime NOT NULL,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `rate_limits` (
  `ip_address` varchar(45) NOT NULL,
  `action` varchar(50) NOT NULL,
  `attempts` int(11) NOT NULL DEFAULT 1,
  `last_attempt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ip_address`,`action`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('admin_user', 'admin'),
('admin_pass', '$2y$10$YourHashedPasswordHere'), -- Use password_hash('yourpassword', PASSWORD_DEFAULT)
('jwt_version', '1');
