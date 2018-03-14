(function($){

  function toggleBtn($btn, $text) {
    $btn.on('click', function(){
      $(this).toggleClass('is-active');
      $text.toggleClass('is-active');
    });
  }

  function openNavMenu($btn, $itemstack, $container, articlepage, contactpage) {
    var $itemstackReverse = $itemstack.reverse();

    $btn.on('click', function() {
      var $navbtn = $(this);

      $navbtn.toggleClass('is-active');
      $container.toggleClass('background');
      disableBtnOnAnimate($navbtn, 1000);
      if(!$navbtn.hasClass('opened')) {
        $container.addClass('inverse', { duration: 600, easing: "easeInOutQuint" });
        $itemstack.each(function(i) {
          var $this = $(this);
          setTimeout(function() {
            $this.addClass("opened");
          }, 100 * i);
        });
      } else {
        $itemstackReverse.each(function(i) {
          var $this = $(this);
          setTimeout(function() {
            $this.removeClass("opened");
          }, 100 * i);
        });
        if(( ($(window).scrollTop() < 360) && articlepage) || contactpage) {
          $container.removeClass('inverse', { duration: 600, easing: "easeInOutQuint" });
        }
      }
    });

    if(articlepage) {
      $(window).on("scroll", function(){
        var scrollpx = $(this).scrollTop();
        if(scrollpx > 360 && !$container.hasClass('inverse')) {
          $container.addClass('inverse', { duration: 600, easing: "easeInOutQuint" });
        } else if (scrollpx < 360 && $container.hasClass('inverse') && !$container.hasClass('background')) {
          $container.removeClass('inverse', { duration: 600, easing: "easeInOutQuint" });
        }
      });
    }
  }

  function disableBtnOnAnimate($button, delay){
    $button.on('click', function(){
      $button.addClass('noreg');
      setTimeout(function(){
        $button.removeClass('noreg');
      }, delay);
    });
  }

  function toggleItemName($menuItem) {
    $menuItem.on("mouseover", function(){
      var name = $(this).attr('id');

      if(name) {
        $(".page-name-container span.page-name[data-page-name='" + name +"']").addClass('selected');
      }

    });

    $menuItem.on("mouseout", function(){
      var name = $(this).attr('id');

      if(name) {
        $(".page-name-container span.page-name[data-page-name='" + name +"']").removeClass('selected');
      }

    });
  }

  jQuery.fn.reverse = function() {
    return this.pushStack(this.get().reverse(), arguments);
  };

  $(document).ready(function(){
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
