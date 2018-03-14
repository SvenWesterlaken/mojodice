<?php

namespace Site\Controllers;

use Slim\Router;
use Slim\Views\Twig;
use Detection\MobileDetect;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class HomeController {

  public function index(Request $request, Response $response, Twig $view, MobileDetect $detect, $lang) {
    return $view->render($response, 'pages/home.twig', [
      'lang' => $lang
    ]);
  }

  public function languageRedirect(Request $request, Response $response, Router $router) {
    $language = $request->getHeader("HTTP_ACCEPT_LANGUAGE")[0];

    if(strpos($language, 'nl') !== false) {
      return $response->withRedirect($router->pathFor('home', ['lang' => 'nl']));
    } else {
      return $response->withRedirect($router->pathFor('home', ['lang' => 'en']));
    }
  }

}

?>
