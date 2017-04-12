<?php

namespace Site\Controllers;

use Slim\Views\Twig;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class PortfolioController {

  public function index(Request $request, Response $response, Twig $view) {
    dd("Portfolio");
  }

}

?>
