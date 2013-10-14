var Obstacle = function (game, w, h, positions, posPick) {
  this.game = game;
  this.w = w;
  this.h = h;
  this.y = positions[posPick];
  this.types = [
    'trad',
    'trad2', 
    'snogubbe'
  ];
  this.sprite = null;
  this.create();
};

Obstacle.prototype = {
  create: function () {
    this.type = this.types[Math.floor(Math.random()*3)];
    this.sprite = this.game.add.sprite(this.w, this.y, this.type);
    this.sprite.body.setSize(100, 20, 0, 0);
    this.sprite.gravity = 0;
  },
  update: function(speed) {
    this.sprite.x += speed * 0.75;
  }
};

