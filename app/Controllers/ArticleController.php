<?php

namespace Site\Controllers;

use Slim\Router;
use Slim\Views\Twig;
use Site\Models\Article;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ArticleController {

  public function index(Request $request, Response $response, Twig $view, Article $article, $lang, $slug) {
    $c_article = $article->where('slug', $slug)->first();
    return $view->render($response, 'pages/article.twig', [
      'lang' => $lang,
      'article' => $c_article
    ]);
  }

  public function languageRedirect(Request $request, Response $response, Router $router, $slug) {
    $language = $request->getHeader("HTTP_ACCEPT_LANGUAGE")[0];

    if(strpos($language, 'nl') !== false) {
      return $response->withRedirect($router->pathFor('article', ['lang' => 'nl', 'slug' => $slug]));
    } else {
      return $response->withRedirect($router->pathFor('article', ['lang' => 'en', 'slug' => $slug]));
    }
  }



}

?>
