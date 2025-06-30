<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// $envPath = __DIR__ . '/../.env'; // Путь к .env (скорректируй по необходимости)

if (!file_exists($envPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Env file not found']);
    exit;
}

$env = parse_ini_file($envPath);
$token = $env['GOOGLE_SCRIPT_TOKEN'] ?? ''; // Берем токен из .env

if (!$token) {
    http_response_code(500);
    echo json_encode(['error' => 'Token not found']);
    exit;
}

echo json_encode(['token' => $token]);
?>