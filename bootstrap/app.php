<?php

use Site\App;
use Illuminate\Database\Capsule\Manager as Capsule;

require __DIR__ . '/../vendor/autoload.php';

$app = new App;

$container = $app->getContainer();

$capsule = new Capsule;

$capsule->addConnection([
  'driver' => 'mysql',
  'host' => 'localhost',
  'database' => 'mojodice',
  'username' => 'root',
  'password' => '',
  'charset' => 'utf8',
  'collation' => 'utf8_unicode_ci',
  'prefix' => ''
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();

require __DIR__ . '/../app/routes.php';

?>
