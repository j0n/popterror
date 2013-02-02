define(function () {
  var Car = function(){
    this.position = 0;
    this.change = false;
    this.height = 80;
    this.$el = document.getElementById('car');
    this.crash = false;
    this.maxRoadSteps = 2;
    this.init();
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
  Car.prototype.render = function(){
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

  return function () {
    return new Car();
  };

});
