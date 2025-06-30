<?php
require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

header("Content-Type: application/json");
echo json_encode([
    "token" => $_ENV['GOOGLE_SCRIPT_TOKEN']
]);
