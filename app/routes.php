<?php

$app->get('/', ['Site\Controllers\HomeController', 'languageRedirect']);
$app->get('/portfolio', ['Site\Controllers\PortfolioController', 'languageRedirect']);
$app->get('/article/{slug}', ['Site\Controllers\ArticleController', 'languageRedirect']);

$app->group('/{lang}', function() {
  $this->get('/', ['Site\Controllers\HomeController', 'index'])->setName('home');
  $this->get('/portfolio', ['Site\Controllers\PortfolioController', 'index'])->setName('portfolio');
  $this->get('/article/{slug}', ['Site\Controllers\ArticleController', 'index'])->setName('article');
  $this->get('/blog', ['Site\Controllers\HomeController', 'index'])->setName('blog');
  $this->get('/services', ['Site\Controllers\HomeController', 'index'])->setName('services');
  $this->get('/about', ['Site\Controllers\HomeController', 'index'])->setName('about');
  $this->get('/contact', ['Site\Controllers\HomeController', 'index'])->setName('contact');
});

?>
