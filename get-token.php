<?php
// require_once __DIR__ . '/vendor/autoload.php';

// $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
// $dotenv->load();

// header("Content-Type: application/json");
// echo json_encode([
    // "token" => $_ENV['GOOGLE_SCRIPT_TOKEN']
// ]);
header('Access-Control-Allow-Origin: https://canadanews.space')
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Проверка наличия автозагрузчика
$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Autoload file not found at ' . $autoloadPath]);
    exit;
}

require_once $autoloadPath;
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..'); // Путь к .env
$dotenv->load();

$token = $env['GOOGLE_SCRIPT_TOKEN'] ?? '';
if (!$token) {
    http_response_code(500);
    echo json_encode(['error' => 'Token not found in .env']);
    exit;
}

echo json_encode(['token' => $token]);
?>