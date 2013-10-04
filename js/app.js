(function ($) {
  $(function () {
    $('.options').on('click', 'a', function (event) {
      event.preventDefault();
      toggleScreen($(this).attr('href').substr(1));
    });
  });

  function toggleScreen(name) {
    $('.screen.active').removeClass('active');
    $('#' + name).addClass('active');
    $(document).trigger('newScreen', name);
  }

}(jQuery));

