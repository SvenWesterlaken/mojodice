<?php

namespace Site\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model {

  public function articles() {
    return $this->belongsToMany(Article::class)->withPivot('url');
  }
}

?>
