define(['tune/car'], function (config) {
  var Car = function(song){
    this.config = config[song];
    this.position = 0;
    this.change = false;
    this.height = 80;
    this.remove = {};
    this.$el = document.getElementById('car');
    this.crash = false;
    this.maxRoadSteps = 2;
    this.init();
  }

  // car crashes
  Car.prototype.crash = function(){
    this.crash = true;
  }

  // Initialize the car and place in the game
  Car.prototype.init = function(){
    this.$el.style.display = 'block';
    this.addControls();

  }
  // moves the car one step up in the road
  Car.prototype.up = function(){
    if (this.position != this.maxRoadSteps){
      this.position++;
    }
  }
  // moves the car one step down in the road
  Car.prototype.down = function(){
    if (this.position != 0){
      this.position--;
    }
  }
  
  // Renders the car in its current position
  //@time - current time of the song
  Car.prototype.render = function(time){
    if (typeof this.config[time] !== 'undefined') {
      if (!this.config[time].done) {
        var current = this.$el.getAttribute('class');

        this.$el.setAttribute('class', this.config[time].action);
        this.config[time].done = true;

        if (typeof this.config[time].remove !== 'undefined'){
          this.remove[this.config[time].remove] = this.config[time];
        }
      }
    }
    if (typeof this.remove[time] !== 'undefined') {
        var current = this.$el.getAttribute('class');
            patt = new RegExp(this.remove[time].action,"g");

        var elClass = current.replace(patt,"");

        delete this.remove[time];
        this.$el.setAttribute('class', elClass);
    }
    if (!this.crash){
      this.$el.style.bottom = ((this.position * this.height) + (this.position * 15)) + 'px';
      this.change = false;
    }
  }

  // Controls that moves the car.
  // will probably be move to a new position later on
  Car.prototype.addControls = function(){
    window.addEventListener('keydown', function(e){
      if (e.keyCode == 38){
        this.up();
      }
      else if (e.keyCode == 40) {
        this.down();
      }
      e.preventDefault();
    }.bind(this))
  }

  return function (song) {
    return new Car(song);
  };

});
