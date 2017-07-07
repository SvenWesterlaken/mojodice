(function($){

  function liftSearchBar($searchinput, $searchwrapper) {
    $searchinput.on("focusout", function() {
      $searchwrapper.removeClass("focused");
    });
    $searchinput.on("focusin", function() {
      $searchwrapper.addClass("focused");
    });
  }

  function toggleFilterMenu($filterbtn, $filterwrapper) {
    $filterbtn.on("click", function() {
      $filterbtn.toggleClass("opened");
      $filterwrapper.toggleClass("opened");
    });
  }

  function shuffleSetup(Shuffle, $grid, $searchinput) {
    var $sortbuttons = $("button.sortby-filter"),
        $categorybuttons = $("button.category-filter"),
        $span = $("#no-items-found");

    var shuffle = new Shuffle($grid, {
      itemSelector: '.item-thumbnail',
      speed: 400,
      easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      delimiter: ',',
    });

    //Search filter
    $searchinput.on("keyup", function() {
      var searchText = $searchinput.val().toLowerCase();

      shuffle.filter(function (element, shuffle) {
        var title = element.getAttribute("data-title").toLowerCase().trim();
        return title.indexOf(searchText) !== -1;
      });

      handleShuffle($grid, $span);
    });

    //Sort filter
    $sortbuttons.on("click", function() {
      var $this = $(this),
          type = $this.attr('id'),
          options = {};

      if($this.hasClass("selected")) {
        $this.removeClass("selected");
      } else {
        $sortbuttons.removeClass("selected");
        $this.addClass("selected");
        options = getSortType(type);
      }

      shuffle.sort(options);
    });

    var activefilters = [];

    //Category filter
    $categorybuttons.on("click", function() {
      var $this = $(this),
          category = $this.attr('id');

      if($this.hasClass("selected")) {
        $this.removeClass("selected");

        var i = activefilters.indexOf(category);

        if(i != -1) {
           activefilters.splice(i, 1);
        }

      } else {
        $this.addClass("selected");
        activefilters.push(category);
      }

      if(activefilters.length > 0) {
        shuffle.filter(function (element, shuffle) {
          var categories = element.getAttribute("data-categories").split(",");
          return activefilters.some(v => categories.indexOf(v) >= 0);
        });
      } else {
        shuffle.filter(Shuffle.ALL_ITEMS);
      }

      handleShuffle($grid, $span);
    });
  }

  function getSortType(type) {
    //Date sort
    function sortByDate(element) {
      return element.getAttribute("data-created-at");
    }

    //Title sort
    function sortByTitle(element) {
      return element.getAttribute("data-title").toLowerCase();
    }

    if(type == "abc") {
      return { reverse: false, by: sortByTitle };
    } else if (type == "xyz") {
      return { reverse: true, by: sortByTitle };
    } else if (type == "newest" || type == "recent") {
      return { reverse: true, by: sortByDate };
    } else if (type == "oldest" || type == "oud") {
      return { reverse: false, by: sortByDate };
    }
  }

  function handleShuffle($grid, $span) {
    if(!$grid.children(".shuffle-item--visible").length) {
      $span.addClass("active");
    } else {
      $span.removeClass("active");
    }
  }

  $(document).ready(function(){
    var $filterwrapper = $(".filter-wrapper"),
        $searchwrapper = $(".search-wrapper"),
        $searchinput = $("#search"),
        $grid = $("#portfolio-grid");

    if($searchwrapper.length) {
      liftSearchBar($searchinput, $searchwrapper);
    }

    if($filterwrapper.length) {
      var $filterbtn = $(".filter-button");
      toggleFilterMenu($filterbtn, $filterwrapper);
    }

    if($grid.length) {
      var Shuffle = window.shuffle;
      shuffleSetup(Shuffle, $grid, $searchinput);
    }

  });

})(jQuery);
