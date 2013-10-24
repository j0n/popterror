var Clouds = function (game) {
  this.game = game;
  this.clouds = 8;
  this.cloudSprites = [];
};

Clouds.prototype = {
  create: function () {
    this.generateClouds(5);
  },

  update: function (speed) {
    var removed = 0;
    for (var i = 0; i < this.cloudSprites.length; i++) {
      var sprite = this.cloudSprites[i];
      sprite.x += speed * sprite.velocity.x;
      if (sprite.x + sprite.bounds.width < 0) {
        this.game.world.group.remove(sprite);
        this.cloudSprites.splice(i, 1);
        removed++;
      }
    }

    this.generateClouds(removed);
  },

  generateClouds: function (count) {
    var heightBounds = this.game.height - 300;
    for (var i = 0; i < count; i++) {
      var spriteName = 'cloud' + (~~(Math.random() * 8) + 1);
      var y = Math.min(~~(Math.random() * heightBounds));
      var x = this.game.width + ~~(Math.random() * this.game.width / 2);
      var sprite = new Phaser.Sprite(this.game, x, y, spriteName);
      sprite.velocity.x = Math.min(Math.random(), 0.4) / 5 + 0.1;
      this.cloudSprites.push(sprite);
      this.game.world.group.addAt(sprite, 1);
    }
  }
};

