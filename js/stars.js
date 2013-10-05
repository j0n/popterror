var Stars = function (game) {
  this.game = game;
  this.stars = [];
};

Stars.prototype = {
  create: function () {
    var xbounds = this.game.width;
    var ybounds = this.game.height - 200;
    var density = 150; // Distance between stars
    for (var x = 0; x < xbounds; x += density) {
      for (var y = 0; y < ybounds; y += density) {
        var name = 'star' + (~~(Math.random() * 2) + 1);
        var xpos = ~~(Math.random() * density) + x;
        var ypos = ~~(Math.random() * density) + y;
        var sprite = new Phaser.Sprite(this.game, xpos, ypos, name);
        this.stars.push(sprite);
        this.game.world.group.addAt(sprite, 1);
      }
    }
  },
  update: function () {

  }
};

