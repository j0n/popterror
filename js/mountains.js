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
    this.group = this.game.add.group();
    this.generateMountainRange();
  },
  update: function (speed) {
    this.group.x += speed * 0.01;
  },
  generateMountainRange: function() {
    // 1-4 mountains in a range
    var count = ~~(Math.random() * 5) + 2;
    var range = [];
    for (var i = 0; i < count; i++) {
      var spriteName = 'mount' + (~~(Math.random() * 4) + 1);
      var c = this.group.create(180 + (i * 100), (~~(Math.random() * 150) - 10) , spriteName,  count - 1);
      range.push(c);
    }
    for (var i = count-1, ii = 0;i>ii;i--) {
      if (Math.random() > 0.5) {
        this.group.bringToTop(range[i]);
        console.log('to top');
      } 
    }

  }
}
