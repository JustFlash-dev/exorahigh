<?php
header('Access-Control-Allow-Origin: https://canadanews.space');
header('Content-Type: application/json');

// путь до autoload
require_once __DIR__ . '/vendor/autoload.php';

// инициализация dotenv
try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
} catch (Exception $e) {
    echo json_encode(['error' => 'Dotenv failed: ' . $e->getMessage()]);
    http_response_code(500);
    exit;
}

$token = $_ENV['GOOGLE_SCRIPT_TOKEN'] ?? null;

if (!$token) {
    echo json_encode(['error' => 'Token missing in .env']);
    http_response_code(500);
    exit;
}

echo json_encode(['token' => $token]);
