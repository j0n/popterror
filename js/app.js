(function ($) {
  $(function () {
    $(document).on('click', '.button, .end a', function (event) {
      event.preventDefault();
      toggleScreen($(this).attr('href').substr(1));
    });
  });

  function toggleScreen(name) {
    $('.screen.active').removeClass('active');
    $('#' + name).addClass('active');
    $('.gameover').removeClass('gameover');
    $(document).trigger('newScreen', name);
  }

}(jQuery));

