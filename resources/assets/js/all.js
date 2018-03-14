"use strict";

(function ($) {

  $(document).ready(function () {
    $(".article-text p img").simplebox();
  });
})(jQuery);
'use strict';

(function ($) {

  function logoAnim(burst, $clickable, $menuItem, $menuBtn) {
    $clickable.on("click", function () {
      setTimeout(function () {
        burst.generate().replay();
      }, 100);
      $(this).addClass('hide');
      $menuItem.each(function (i) {
        var $this = $(this);
        if (i === 4) {
          setTimeout(function () {
            $this.addClass('revealed');
          }, 100);
        } else if (i == 1 || i == 3 || i >= 5 && i <= 8 || i >= 10 && i <= 13) {
          setTimeout(function () {
            $this.addClass('revealed');
          }, 350);
        } else if (i === 0 || i === 2 || i === 9 || i === 14) {
          setTimeout(function () {
            $this.addClass('revealed');
          }, 600);
        }
      });
    });

    $menuBtn.on("click", function () {
      //Animation + 400ms
      $clickable.delay(1000).removeClass('hide', 100);
      $menuItem.each(function (i) {
        var $this = $(this);
        if (i === 4) {
          setTimeout(function () {
            $this.removeClass('revealed');
          }, 600);
        } else if (i === 1 || i === 3 || i >= 5 && i <= 8 || i >= 10 && i <= 13) {
          setTimeout(function () {
            $this.removeClass('revealed');
          }, 350);
        } else if (i === 0 || i === 2 || i === 9 || i === 14) {
          setTimeout(function () {
            $this.removeClass('revealed');
          }, 100);
        }
      });
    });
  }

  function toggleItemName($menuItem) {
    $menuItem.on("mouseover", function () {
      var name = $(this).data("link-type");

      if (name) {
        $(".message-container span[data-link-text='" + name + "']").addClass('selected');
      }
    });

    $menuItem.on("mouseout", function () {
      var name = $(this).data("link-type");

      if (name) {
        $(".message-container span[data-link-text='" + name + "']").removeClass('selected');
      }
    });
  }

  $(document).ready(function () {
    var $clickable = $('.img-container'),
        $menuBtn = $('.menu-item#close-btn'),
        $menuItem = $('.menu-item');

    if ($clickable.length) {
      var posY = $clickable.offset().top + $clickable.height() / 2;

      var burst = new mojs.Burst({
        left: '50%',
        top: posY,
        count: 10,
        radius: { 0: 150 },
        angle: 360,
        children: {
          shape: 'rect',
          radius: 15,
          scale: { 'rand(0.2, 1)': 0 },
          stroke: '#fefefe',
          fill: 'none',
          angle: { 0: 'rand(-180, 180)' },
          degreeShift: 'rand(-180, 180)',
          duration: 1200,
          easing: 'quad.out'
        }
      });

      logoAnim(burst, $clickable, $menuItem, $menuBtn);
      toggleItemName($menuItem);
    }
  });
})(jQuery);
'use strict';

(function ($) {

  function toggleBtn($btn, $text) {
    $btn.on('click', function () {
      $(this).toggleClass('is-active');
      $text.toggleClass('is-active');
    });
  }

  function openNavMenu($btn, $itemstack, $container, articlepage, contactpage) {
    var $itemstackReverse = $itemstack.reverse();

    $btn.on('click', function () {
      var $navbtn = $(this);

      $navbtn.toggleClass('is-active');
      $container.toggleClass('background');
      disableBtnOnAnimate($navbtn, 1000);
      if (!$navbtn.hasClass('opened')) {
        $container.addClass('inverse', { duration: 600, easing: "easeInOutQuint" });
        $itemstack.each(function (i) {
          var $this = $(this);
          setTimeout(function () {
            $this.addClass("opened");
          }, 100 * i);
        });
      } else {
        $itemstackReverse.each(function (i) {
          var $this = $(this);
          setTimeout(function () {
            $this.removeClass("opened");
          }, 100 * i);
        });
        if ($(window).scrollTop() < 360 && articlepage || contactpage) {
          $container.removeClass('inverse', { duration: 600, easing: "easeInOutQuint" });
        }
      }
    });

    if (articlepage) {
      $(window).on("scroll", function () {
        var scrollpx = $(this).scrollTop();
        if (scrollpx > 360 && !$container.hasClass('inverse')) {
          $container.addClass('inverse', { duration: 600, easing: "easeInOutQuint" });
        } else if (scrollpx < 360 && $container.hasClass('inverse') && !$container.hasClass('background')) {
          $container.removeClass('inverse', { duration: 600, easing: "easeInOutQuint" });
        }
      });
    }
  }

  function disableBtnOnAnimate($button, delay) {
    $button.on('click', function () {
      $button.addClass('noreg');
      setTimeout(function () {
        $button.removeClass('noreg');
      }, delay);
    });
  }

  function toggleItemName($menuItem) {
    $menuItem.on("mouseover", function () {
      var name = $(this).attr('id');

      if (name) {
        $(".page-name-container span.page-name[data-page-name='" + name + "']").addClass('selected');
      }
    });

    $menuItem.on("mouseout", function () {
      var name = $(this).attr('id');

      if (name) {
        $(".page-name-container span.page-name[data-page-name='" + name + "']").removeClass('selected');
      }
    });
  }

  jQuery.fn.reverse = function () {
    return this.pushStack(this.get().reverse(), arguments);
  };

  $(document).ready(function () {
    var $homebtn = $('#home'),
        articlepage = $('.article-header').length,
        contactpage = $('.contact-container').length,
        $navMenuBtn = $('.nav-container .nav-item.hamburger'),
        $navButtons = $('.nav-container .nav-item'),
        $navContainer = $('.nav-container'),
        $text = $('span.text');

    toggleItemName($navButtons);
    toggleBtn($homebtn, $text);
    openNavMenu($navMenuBtn, $navButtons, $navContainer, articlepage, contactpage);
  });
})(jQuery);
"use strict";

(function ($) {

  var container = $("#particles-js");

  if (container.length) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 60,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#fefefe"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.6,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.4,
            "sync": false
          }
        },
        "size": {
          "value": 2,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 6,
            "size_min": 1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 130,
          "color": "#fefefe",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "repulse"
          },
          "onclick": {
            "enable": false,
            "mode": "bubble"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 239.76023976023976,
            "size": 1.5,
            "duration": 0.3996003996003996,
            "opacity": 1,
            "speed": 3
          },
          "repulse": {
            "distance": 100,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
})(jQuery);
"use strict";

(function ($) {

  function liftSearchBar($searchinput, $searchwrapper) {
    $searchinput.on("focusout", function () {
      $searchwrapper.removeClass("focused");
    });
    $searchinput.on("focusin", function () {
      $searchwrapper.addClass("focused");
    });
  }

  function toggleFilterMenu($filterbtn, $filterwrapper) {
    $filterbtn.on("click", function () {
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
      delimiter: ','
    });

    //Search filter
    $searchinput.on("keyup", function () {
      var searchText = $searchinput.val().toLowerCase();

      shuffle.filter(function (element, shuffle) {
        var title = element.getAttribute("data-title").toLowerCase().trim();
        return title.indexOf(searchText) !== -1;
      });

      handleShuffle($grid, $span);
    });

    //Sort filter
    $sortbuttons.on("click", function () {
      var $this = $(this),
          type = $this.attr('id'),
          options = {};

      if ($this.hasClass("selected")) {
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
    $categorybuttons.on("click", function () {
      var $this = $(this),
          category = $this.attr('id');

      if ($this.hasClass("selected")) {
        $this.removeClass("selected");

        var i = activefilters.indexOf(category);

        if (i != -1) {
          activefilters.splice(i, 1);
        }
      } else {
        $this.addClass("selected");
        activefilters.push(category);
      }

      if (activefilters.length > 0) {
        shuffle.filter(function (element, shuffle) {
          var categories = element.getAttribute("data-categories").split(",");
          return activefilters.some(function (v) {
            return categories.indexOf(v) >= 0;
          });
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

    //Date sort
    function sortByUpdate(element) {
      return element.getAttribute("data-updated-at");
    }

    //Title sort
    function sortByTitle(element) {
      return element.getAttribute("data-title").toLowerCase();
    }

    if (type == "abc") {
      return { reverse: false, by: sortByTitle };
    } else if (type == "xyz") {
      return { reverse: true, by: sortByTitle };
    } else if (type == "newest") {
      return { reverse: true, by: sortByDate };
    } else if (type == "oldest") {
      return { reverse: false, by: sortByDate };
    } else if (type == "lastupdate") {
      return { reverse: true, by: sortByUpdate };
    } else if (type == "oldupdate") {
      return { reverse: false, by: sortByUpdate };
    }
  }

  function handleShuffle($grid, $span) {
    if (!$grid.children(".shuffle-item--visible").length) {
      $span.addClass("active");
    } else {
      $span.removeClass("active");
    }
  }

  $(document).ready(function () {
    var $filterwrapper = $(".filter-wrapper"),
        $searchwrapper = $(".search-wrapper"),
        $searchinput = $("#search"),
        $grid = $("#portfolio-grid");

    if ($searchwrapper.length) {
      liftSearchBar($searchinput, $searchwrapper);
    }

    if ($filterwrapper.length) {
      var $filterbtn = $(".filter-button");
      toggleFilterMenu($filterbtn, $filterwrapper);
    }

    if ($grid.length) {
      var Shuffle = window.shuffle;
      shuffleSetup(Shuffle, $grid, $searchinput);
    }
  });
})(jQuery);
'use strict';

(function ($) {
    'use strict';

    $.fn.simplebox = function (options) {
        var settings = $.extend({
            fadeSpeed: 400,
            darkMode: false
        }, options);

        // Helper Variables
        var $body = $("body");
        var $overlay = $('<div id="slb-overlay"></div>');
        var $image = $("<img class='slb'>");
        var fadeSpeed = settings.fadeSpeed;
        var lbIsOpen = false;

        // Modifying theme based on preference
        if (settings.darkMode) {
            $overlay.css('background-color', 'black');
            $('.slb').addClass('slb--invert');
            $image.addClass('slb--invert');
        } else {
            $overlay.css('background-color', 'white');
        }

        // Function for hiding the overlay.
        var hideOverlay = function hideOverlay() {
            $overlay.fadeOut(fadeSpeed);
            $image.removeClass('slb--opened');
            lbIsOpen = false;
            $body.css("overflow", "auto");
        };

        // When X is clicked or user clicks on the overlay div
        // Hide lightbox
        $overlay.click(hideOverlay);

        // Attaching ESC listener
        $(document).keyup(function (e) {
            if (e.keyCode == 27 && lbIsOpen) {
                hideOverlay();
            }
        });

        return this.each(function () {
            var $this = $(this);

            // When the image is clicked
            $this.click(function () {
                lbIsOpen = true;
                $body.css("overflow", "hidden");

                var $this = $(this);
                var imageSRC = $this.attr("src");
                $image.attr("src", imageSRC);
                $image.css("max-height", "80%");
                $image.addClass('pop-in');
                $image.removeClass('pop-out');
                $image.addClass('center');
                $image.addClass('slb--opened');

                $overlay.css('pointer-events', 'initial');

                $overlay.append($image);
                $body.append($overlay);

                // Show all the things!
                $overlay.fadeIn(fadeSpeed);
            });
        });
    };
})(jQuery);