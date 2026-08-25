<?php
// Requires $pdo to be available
function checkRateLimit($pdo, $ip, $action, $max_attempts, $window_minutes) {
    $stmt = $pdo->prepare("SELECT attempts, last_attempt FROM rate_limits WHERE ip_address = ? AND action = ?");
    $stmt->execute([$ip, $action]);
    $row = $stmt->fetch();
    
    if ($row) {
        $last = strtotime($row['last_attempt']);
        if (time() - $last > $window_minutes * 60) {
            // Reset limit
            $stmt = $pdo->prepare("UPDATE rate_limits SET attempts = 1, last_attempt = CURRENT_TIMESTAMP WHERE ip_address = ? AND action = ?");
            $stmt->execute([$ip, $action]);
            return true;
        } else {
            if ($row['attempts'] >= $max_attempts) {
                return false; // rate limited
            }
            $stmt = $pdo->prepare("UPDATE rate_limits SET attempts = attempts + 1, last_attempt = CURRENT_TIMESTAMP WHERE ip_address = ? AND action = ?");
            $stmt->execute([$ip, $action]);
            return true;
        }
    } else {
        $stmt = $pdo->prepare("INSERT INTO rate_limits (ip_address, action, attempts) VALUES (?, ?, 1)");
        $stmt->execute([$ip, $action]);
        return true;
    }
}

function clearRateLimit($pdo, $ip, $action) {
    $stmt = $pdo->prepare("DELETE FROM rate_limits WHERE ip_address = ? AND action = ?");
    $stmt->execute([$ip, $action]);
}
