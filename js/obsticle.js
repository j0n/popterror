define(['tune/obsticle'], function (config) {
  var Obsticle = function(song, type,  number){
    console.log('construct');
    this.remove = {};
    this.config = config[song];
    this.number = number;
    this.type = type;
    this.yPos = 0;
    if (this.type == 'blue') {
      this.yPos = 1;
    }
    this.xPos = -100;
    this.init();
  }
  Obsticle.prototype.init = function(){
    this.$el = document.createElement('div');
    this.$el.setAttribute('id', 'obsticle-' + this.number);
    this.$el.setAttribute('class', 'obsticle ' + this.type);
    this.$el.style.bottom = (this.yPos * 80) + 'px'
    document.getElementsByTagName('body')[0].appendChild(this.$el);
  }
  Obsticle.prototype._checkTime = function(time){
    if (typeof this.config[time] !== 'undefined') {
      if (!this.config[time].done) {
        var current = this.$el.getAttribute('class');
        this.$el.setAttribute('class', current + this.config[time].action);
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
  }
  // Maybe should do an object class so the render funtion does the same thing in all places.
  // inherinteance is alway a black hole dough
  Obsticle.prototype.render = function(time, speed){
    //this._checkTime(time);
    this.xPos = this.xPos + speed;
    this.$el.style.right = this.xPos + 'px';
    console.log(document.width > this.xPos);
    return document.width > this.xPos;
  }
  return function(song, type, number){
    return new Obsticle(song, type, number);
  }
});
