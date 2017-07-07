(function($){

  function logoAnim(burst, $clickable, $menuItem, $menuBtn) {
    $clickable.on("click", function(){
      setTimeout(function() {
        burst.generate().replay();
      }, 100);
      $(this).addClass('hide');
      $menuItem.each(function(i){
        var $this = $(this);
        if(i === 4) {
          setTimeout(function(){
            $this.addClass('revealed');
          }, 100);
        } else if (i == 1 || i == 3 || i >= 5 && i <= 8 || i >= 10 && i <= 13) {
          setTimeout(function(){
            $this.addClass('revealed');
          }, 350);
        } else if(i === 0 || i === 2 || i === 9 || i === 14) {
          setTimeout(function(){
            $this.addClass('revealed');
          }, 600);
        }
      });
    });

    $menuBtn.on("click", function(){
      //Animation + 400ms
      $clickable.delay(1000).removeClass('hide', 100);
      $menuItem.each(function(i){
        var $this = $(this);
        if(i === 4) {
          setTimeout(function(){
            $this.removeClass('revealed');
          }, 600);
        } else if(i === 1 || i === 3 || i >= 5 && i <= 8 || i >= 10 && i <= 13) {
          setTimeout(function(){
            $this.removeClass('revealed');
          }, 350);
        } else if(i === 0 || i === 2 || i === 9 || i === 14) {
          setTimeout(function(){
            $this.removeClass('revealed');
          }, 100);
        }
      });
    });
  }

  function toggleItemName($menuItem) {
    $menuItem.on("mouseover", function(){
      var name = $(this).data("link-type");

      if(name) {
        $(".message-container span[data-link-text='" + name +"']").addClass('selected');
      }

    });

    $menuItem.on("mouseout", function(){
      var name = $(this).data("link-type");

      if(name) {
        $(".message-container span[data-link-text='" + name +"']").removeClass('selected');
      }

    });
  }

  $(document).ready(function(){
    var $clickable = $('.img-container'),
        $menuBtn = $('.menu-item#close-btn'),
        $menuItem = $('.menu-item');

    if($clickable.length) {
      var posY = ($clickable.offset().top) + ($clickable.height() / 2);

      const burst = new mojs.Burst({
        left:           '50%',
        top:            posY,
        count:          10,
        radius:         { 0: 150 },
        angle:          360,
        children: {
          shape:        'rect',
          radius:       15,
          scale:        {'rand(0.2, 1)' : 0},
          stroke:       '#fefefe',
          fill:         'none',
          angle:        { 0: 'rand(-180, 180)' },
          degreeShift:  'rand(-180, 180)',
          duration:     1200,
          easing:       'quad.out',
        }
      });

      logoAnim(burst, $clickable, $menuItem, $menuBtn);
      toggleItemName($menuItem);
    }

  });

})(jQuery);
