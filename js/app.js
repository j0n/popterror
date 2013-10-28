(function ($) {
  $(function () {
    $(document).on('click', '.button', function (event) {
      console.log('new fuck');
      event.preventDefault();
      toggleScreen($(this).attr('href').substr(1));
    });
    $('.end').on('click', 'a', function() {
      toggleScreen('stage', true);
      $(document).trigger('restart');
    })
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

