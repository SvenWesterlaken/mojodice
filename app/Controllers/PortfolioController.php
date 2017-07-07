<?php

namespace Site\Controllers;

use Slim\Router;
use Slim\Views\Twig;
use Site\Models\Article;
use Site\Models\Category;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class PortfolioController {

  public function index(Request $request, Response $response, Twig $view, Article $article, Category $category, $lang) {

    $articles = $article->getPortfolioItems();
    $categories = $category->get();

    return $view->render($response, 'pages/portfolio.twig', [
      "articles" => $articles,
      "categories" => $categories,
      "lang" => $lang,
    ]);
  }

  public function languageRedirect(Request $request, Response $response, Router $router) {
    $language = $request->getHeader("HTTP_ACCEPT_LANGUAGE")[0];
    if(strpos($language, 'nl') !== false) {
      return $response->withRedirect($router->pathFor('portfolio', ['lang' => 'nl']));
    } else {
      return $response->withRedirect($router->pathFor('portfolio', ['lang' => 'en']));
    }
  }

}

?>
