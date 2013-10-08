var Obstacle = function (game, w, h) {
  console.log(game);
  this.game = game;
  this.w = w;
  this.h = h;
  this.sprite = null;
  this.create();
};

Obstacle.prototype = {
  create: function () {
    console.log(this.game);
    this.sprite = this.game.add.sprite(this.w, this.h-200, 'trad');
    this.sprite.body.setSize(100, 30, 0, 0);
    this.sprite.gravity = 0;
  },
  update: function(speed) {
    this.sprite.x += speed * 0.75;
  }

}
