<?php
// === 0. Подгрузка переменных из .env ===
$env = [];
if (file_exists(__DIR__ . '/.env')) {
  foreach (file(__DIR__ . '/.env') as $line) {
    if (preg_match('/^([A-Z0-9_]+)\s*=\s*(.*)$/', trim($line), $m)) {
      $env[$m[1]] = $m[2];
    }
  }
}
$secret = $env['WEBHOOK_SECRET'] ?? '';
// === 1. Настройки ===
$repoPath = '/home2/canadan1/public_html';
$logFile = $repoPath . '/deploy.log';

// === 2. Подпись Webhook ===
$headers = getallheaders();
$payload = file_get_contents('php://input');
$signature = $headers['X-Hub-Signature-256'] ?? '';
$expected = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if (!hash_equals($expected, $signature)) {
    http_response_code(403);
    echo "Invalid signature.\n";
    file_put_contents($logFile, date('c') . " - Invalid signature\n", FILE_APPEND);
    exit;
}

// === 3. Устанавливаем окружение
putenv('HOME=/home2/canadan1');
putenv('USER=canadan1');

// === 4. Переходим в директорию проекта
chdir($repoPath);

// === 5. Проверка на зависший merge
if (file_exists('.git/MERGE_HEAD')) {
    $output = shell_exec('git merge --abort 2>&1');
    $log = "Aborted unfinished merge:\n$output\n";
} else {
    $log = '';
}

// === 6. Выполняем git pull
$cmd = 'git pull origin main 2>&1';
$output = shell_exec($cmd);
$log .= "Git Pull Output:\n" . $output . "\n";

// === 7. Запись в лог
file_put_contents($logFile, date('c') . "\n" . $log . "\n", FILE_APPEND);

// === 8. Ответ
echo "<pre>$log</pre>";
