(function($){

  function toggleBtn($btn, $text) {
    $btn.on('click', function(){
      $(this).toggleClass('is-active');
      $text.toggleClass('is-active');
    });
  }

  function openNavMenu($btn, $btngroup) {
    var $itemstack = $btngroup,
        $itemstackReverse = $btngroup.reverse();

    $btn.on('click', function() {
      var $navbtn = $(this);

      $navbtn.toggleClass('is-active');
      disableBtnOnAnimate($navbtn, 1000)
      if(!$navbtn.hasClass('opened')) {
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
      }
    });
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
        $navMenuBtn = $('.nav-container .nav-item.hamburger');
        $navButtons = $('.nav-container .nav-item');
        $text = $('span.text');

    toggleItemName($navButtons);
    toggleBtn($homebtn, $text);
    openNavMenu($navMenuBtn, $navButtons);
  });

})(jQuery);
