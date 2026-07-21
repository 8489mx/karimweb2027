CREATE TABLE IF NOT EXISTS package_prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    package_code VARCHAR(50) NOT NULL,
    duration_code VARCHAR(10) NOT NULL,
    country_code VARCHAR(10) NOT NULL,
    currency_code VARCHAR(10) NOT NULL,
    base_duration_months INT NOT NULL,
    free_months INT NOT NULL DEFAULT 0,
    final_amount DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_package_duration_country (package_code, duration_code, country_code)
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    phone_country_code VARCHAR(10) NOT NULL,
    residence_country VARCHAR(50) NOT NULL,
    detected_country VARCHAR(50),
    package_code VARCHAR(50) NOT NULL,
    duration_code VARCHAR(10) NOT NULL,
    base_duration_months INT NOT NULL,
    free_months INT NOT NULL,
    total_duration_months INT NOT NULL,
    currency_code VARCHAR(10) NOT NULL,
    final_amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending_payment',
    country_review_required BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed Data (For Testing/Initial Setup)
INSERT IGNORE INTO package_prices (package_code, duration_code, country_code, currency_code, base_duration_months, free_months, final_amount, is_active) VALUES
('elite', '3m', 'EG', 'EGP', 3, 0, 3000.00, 1),
('elite', '6m', 'EG', 'EGP', 6, 1, 5500.00, 1),
('elite', '12m', 'EG', 'EGP', 12, 3, 10000.00, 1),
('max', '3m', 'EG', 'EGP', 3, 0, 4500.00, 1),
('max', '6m', 'EG', 'EGP', 6, 1, 8000.00, 1),
('max', '12m', 'EG', 'EGP', 12, 3, 15000.00, 1);
