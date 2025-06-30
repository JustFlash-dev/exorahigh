<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

$envPath = __DIR__ . '/.env'; //Путь из Public_html//
if (!file_exists($envPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Env file not found at ' . $envPath]);
    exit;
}

$env = @parse_ini_file($envPath);
if ($env === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to parse env file at ' . $envPath]);
    exit;
}

$token = $env['GOOGLE_SCRIPT_TOKEN'] ?? '';
if (!$token) {
    http_response_code(500);
    echo json_encode(['error' => 'Token not found in .env']);
    exit;
}

echo json_encode(['token' => $token]);
?>