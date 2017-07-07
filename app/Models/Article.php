<?php

namespace Site\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model {

  private $categoriesString;

  static public function slugify($text){
    $text = preg_replace('~[^\pL\d]~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);

    if (empty($text)) {
      return 'n-a';
    }

    return $text;
  }

  public function getTitle($l) {
    if ($l == 'nl') {
      return $this->nl_title;
    } else {
      return $this->en_title;
    }
  }

  public function getContent($l) {
    if ($l == 'nl') {
      return $this->nl_content;
    } else {
      return $this->en_content;
    }
  }

  public function getPortfolioItems() {
    return $this->whereHas('types', function ($query) {
      $query->where('en_name', '=', 'portfolio');
    })->get();
  }

  public function getCategories($l) {
    $categories = $this->categoriesString;

    if ($categories == "") {
      foreach($this->categories()->get() as $category) {
        $categories .= "," . $category->getName($l);
      }

      $categories = substr($categories, 1);
      $this->categoriesString = $categories;
    }

    return $categories;
  }

  public function thumbnail() {
    return $this->hasOne(Thumbnail::class);
  }

  public function types() {
    return $this->belongsToMany(Type::class);
  }

  public function categories() {
    return $this->belongsToMany(Category::class);
  }

}

?>
