var Mountains = function (game) {
  this.game = game;
  this.m    = [];
  game.load.image('mount1', 'assets/berg_1.png');
  game.load.image('mount2', 'assets/berg_2.png');
  game.load.image('mount3', 'assets/berg_3.png');
  game.load.image('mount4', 'assets/berg_4.png');
};

Mountains.prototype = {
  create: function () {
    generateMountainRange();
  },
  update: function () {

  }
};

function generateMountainRange() {
  // 1-4 mountains in a range
  var count = ~~(Math.random() * 4) + 1;

  // Generate sprites for this range
  var range = [];
  for (var i = 0; i < count; i++) {
    var spriteName = 'mount' + (~~(Math.random() * 4) + 1);
    console.log(spriteName);
    var sprite = new Phaser.Sprite(this.game, 0, 0, spriteName);
    console.log(sprite);
  }
}

