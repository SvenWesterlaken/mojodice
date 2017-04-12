<?php

$app->get('/', ['Site\Controllers\HomeController', 'index'])->setName('home');
$app->get('/portfolio', ['Site\Controllers\PortfolioController', 'index'])->setName('portfolio');

?>
