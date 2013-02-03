//
// # Main game logic
//
define(['rafshim', 'car', 'obsticle', 'tune/game'], function (ref, Car,Obsticle,  config) {

  //
  // ## Constructor
  //
  var Game = function (song) {
    //name of song
    this.song = song;

    // set config of the song
    this.config = config[song];

    // current time of the song
    this.time = 0;
    
    // Pixels/second
    this.speed = this.config.speed;

    // Background offset, makes car "move"
    this.offset = 0;
    this.bgwidth = 960;

    // content element
    this.content = document.getElementById('content');

    // the main tune for the game
    this.$tune = document.getElementById('song-'+song);
  
    // elements in the game that also should be renderd
    this.elements = {};
    this.car = new Car(song);
    this.car.width = 40;

    // counter to keep obsticles unique
    this.amountOfelements = 0;

    this._lastFrame = new Date().getTime();
  };

  //
  // ## Start game
  //
  Game.prototype.start = function() {
    this.$tune.addEventListener('timeupdate', function(){
      this.time = Math.floor(this.$tune.currentTime);
    }.bind(this));

    requestAnimationFrame(this.render.bind(this));
    this.$tune.play();
  };

  //
  // ## Render Scene
  //
  Game.prototype.render = function(time) {
    requestAnimationFrame(this.render.bind(this));

    if (Math.random()*100<1) {
      this.randomObsticle();
    }

    // if there is an action for the game to take, take it!
    if (typeof this.config[this.time] !== 'undefined') {
      if (this.config[this.time].action == 'speed') {
        this.speed = this.config[this.time].speed;
      }
      if (this.config[this.time].action == 'obsticle') {
        if(!this.config[this.time].done){
          this.config[this.time] = true;
          this.randomObsticle();
        }
      }
      if (this.config[this.time].action == 'end') {
        this.speed = 0;
      }
    }

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

    for (var key in this.elements) {
      el = this.elements[key];
      if (el.render(this.time, distance)) {
        if (el.atCar && el.position == this.car.position) {
          this.car.crash();
        }
      }
      else {
        // destory
        delete this.elements[key];
      }
    }

    this.car.render(this.time);
    this.content.style.backgroundPosition = offset + 'px bottom';
  };

  Game.prototype.randomObsticle = function(){
    this.amountOfelements++;
    var type = Math.random()*10>5 ? 'red' : 'blue'; // temp two diffren Obsticles
    var obsticle = new Obsticle(this.song, type,  this.amountOfelements);
    this.elements['obsticle-'+this.amountOfelements] = obsticle;
  }

  return function (song) {
    return new Game(song);
  };
});

