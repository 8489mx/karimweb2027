CREATE TABLE IF NOT EXISTS settings (
    setting_key VARCHAR(255) PRIMARY KEY,
    setting_value LONGTEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    country VARCHAR(10) NOT NULL,
    package_name VARCHAR(50) NOT NULL,
    package_code VARCHAR(50) NOT NULL,
    duration VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    date DATETIME NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (created_at)
);

CREATE TABLE IF NOT EXISTS coupons (
    code VARCHAR(50) PRIMARY KEY,
    discount_percentage DECIMAL(5,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at DATETIME NULL
);

CREATE TABLE IF NOT EXISTS rate_limits (
    ip_address VARCHAR(45) NOT NULL,
    action VARCHAR(50) NOT NULL,
    attempts INT DEFAULT 1,
    last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (ip_address, action)
);

-- Insert default admin (Change before production!)
-- Default password: admin123
-- jwt_version is used to invalidate old tokens on password change
INSERT IGNORE INTO settings (setting_key, setting_value) VALUES 
('admin_user', 'admin'),
('admin_pass', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('jwt_version', '1'),
('pricing', '{"EG":{"elite":{"3m":{"baseDurationMonths":3,"freeMonths":1,"finalAmount":4000,"originalAmount":6500},"6m":{"baseDurationMonths":6,"freeMonths":2,"finalAmount":7500,"originalAmount":12000}},"max":{"3m":{"baseDurationMonths":3,"freeMonths":1,"finalAmount":6000,"originalAmount":10000},"6m":{"baseDurationMonths":6,"freeMonths":2,"finalAmount":11000,"originalAmount":18000}},"currency":"EGP"}}'),
('socialLinks', '{"instagram":"#","facebook":"#","tiktok":"#","snapchat":"#","youtube":"#"}');
