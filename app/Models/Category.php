<?php

namespace Site\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {

  public function getName($l) {
    if ($l == 'nl') {
      return $this->nl_name;
    } else {
      return $this->en_name;
    }
  }
}

?>
