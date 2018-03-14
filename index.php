<?php

use Site\App;
session_start();

require __DIR__ . '/vendor/autoload.php';

$app = new App;
$container = $app->getContainer();

require __DIR__ . '/app/database.php';

require __DIR__ . '/app/routes.php';

$app->run();

?>
