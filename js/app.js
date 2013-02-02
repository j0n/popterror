//
// # Main App JS
//
require(['game'], function (game) {
  // Initial setup
  var c = document.createElement('canvas');
  if (!(c.getContext && c.getContext('2d'))) {
    // No canvas support :(
    return;
  }

  // Remove legacy browser warning.
  var legacy = document.getElementById('legacyBrowser');
  legacy.parentNode.removeChild(legacy);

  // Insert canvas and get things going.
  document.getElementsByTagName('body')[0].appendChild(c);

  // @TODO: Wrap this in "start game thingy"
  var g = game();
  g.start();
});

