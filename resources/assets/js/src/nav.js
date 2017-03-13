(function($){

  var $btn,
      $text;

  function toggleBtn() {
    $btn.on('click', function(){
      $(this).toggleClass('is-active');
      $text.toggleClass('is-active');
    });
  }

  $(document).ready(function(){
    $btn = $('.hamburger');
    $text = $('span.text');

    toggleBtn();
  });

})(jQuery);
