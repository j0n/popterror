(function ($) {
  $(function () {
    $(document).on('click', '.button', function (event) {
      event.preventDefault();
      toggleScreen($(this).attr('href').substr(1));
    });
    $('.end').on('click', '#restart', function() {
      toggleScreen('stage', true);
      $(document).trigger('restart');
    })
    $('#fb-sharelink').on('click', function(e) {
      e.preventDefault();
      window.open(
        $(this).attr('href'),
        'facebook-share-dialog', 
        'width=626,height=436'
      );
    });
  });

  function toggleScreen(name, preventNewScreen) {
    $('.screen.active').removeClass('active');
    $('#' + name).addClass('active');
    $('.gameover').removeClass('gameover');
    if (preventNewScreen === void 0) {
      $(document).trigger('newScreen', name);
    }
  }

}(jQuery));

