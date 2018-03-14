<?php

use function DI\get;
use Slim\Views\Twig;
use Site\Models\Article;
use Detection\MobileDetect;
use Slim\Views\TwigExtension;
use Interop\Container\ContainerInterface;
use Aptoma\Twig\Extension\MarkdownExtension;
use Aptoma\Twig\Extension\MarkdownEngine;

return [
  'router' => DI\object(Slim\Router::class),

  Twig::class => function (ContainerInterface $c) {
    $twig = new Twig(__DIR__ . '/../resources/twig', [
      'cache' => false,
      'debug' => true
    ]);

    $twig->addExtension(new TwigExtension(

      $c->get('router'),
      $c->get('request')->getUri()

    ));

    $twig->addExtension(new Twig_Extension_Debug());
    $twig->addExtension(new Twig_Extensions_Extension_Intl());
    $twig->addExtension(new MarkdownExtension($c->get(MarkDownEngine::class)));

    $twig->getEnvironment()->addGlobal('assetUrl', $c->get('request')->getUri()->getBaseUrl() . '/resources/assets');

    return $twig;

  },

  MarkDownEngine::class => function (ContainerInterface $c) {
    return new MarkdownEngine\MichelfMarkdownEngine();
  },

  MobileDetect::class => function (ContainerInterface $c) {
    return new MobileDetect;
  },

  Article::class => function (ContainerInterface $c) {
    return new Article;
  },

  Type::class => function (ContainerInterface $c) {
    return new Type;
  },

  Category::class => function (ContainerInterface $c) {
    return new Category;
  },

  Link::class => function (ContainerInterface $c) {
    return new Link;
  },
]

?>
