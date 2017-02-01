<?php

use function DI\get;
use Slim\Views\Twig;
use Slim\Views\TwigExtension;
use Interop\Container\ContainerInterface;

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

    return $twig;

  },
]

?>
