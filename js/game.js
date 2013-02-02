//
// # Main game logic
//
define(['rafshim', 'car'], function (ref, Car) {

  //
  // ## Constructor
  //
  var Game = function () {
    // Pixels/second
    this.speed = 90;

    // Background offset, makes car "move"
    this.offset = 0;
    this.bgwidth = 960;

    // content element
    this.content = document.getElementById('content');

    // elements in the game that also should be renderd
    this.elements = {};

    this.car = new Car();
    this.car.width = 40;

    this._lastFrame = new Date().getTime();
  };

  //
  // ## Start game
  //
  Game.prototype.start = function() {
    requestAnimationFrame(this.render.bind(this));
  };

  //
  // ## Render Scene
  //
  Game.prototype.render = function(time) {
    requestAnimationFrame(this.render.bind(this));

    var delta;
    if (time < 1e12) {
      delta = ((this._lastFrame - time)/1000) * -1;
    }
    else {
      delta = (time - this._lastFrame)/1000;
    }
    this._lastFrame = time;

    var distance = this.speed * delta;
    var offset = this.offset - distance;
    if (offset <= this.bgwidth * -1) {
      offset = 0;
    }
    else if (offset >= this.bgwidth) {
      offset = 0;
    }
    this.offset = offset;

    for (var el in this.elements) {
      this.el.render();
    }
    this.car.render();

    this.content.style.backgroundPosition = offset + 'px bottom';
  };

  return function () {
    return new Game();
  };
});

