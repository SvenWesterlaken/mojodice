<?php

namespace Site\Models;

use Illuminate\Database\Eloquent\Model;

class Thumbnail extends Model {

  private $baseurl = "../../resources/assets/img/thumbnails/";


  //TODO: Add base url etc.
  public function getThumbnailURL() {
    return $this->url;
  }

  public function article() {
    return $this->belongsTo(Article::class);
  }

}

?>
