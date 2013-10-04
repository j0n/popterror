(function($) {
  $(document).on('newScreen', function(){
      var w = window.innerWidth;
      var h = window.innerHeight;
      var enimies = [];
      var isDead = false;
      var config = getConfig();
      //var tune = document.getElementById('song-motorAway');
      var time = 0;
      var speed = 0;
      var car, sky, bg, bg2, vag;

      var game = new Phaser.Game(w, h, Phaser.CANVAS, 'stage', { preload: init, create: create, update: update });
      window.game = game;
      function init() {
          game.load.image('sky', 'assets/himmel.png');
          game.load.image('bg', 'assets/trad_bak.png');
          game.load.image('bg2', 'assets/trad_fram.png');
          game.load.image('vag', 'assets/vag_streck.png');
          game.load.image('car', 'assets/bil.png');
          //myGame.load.load();
      }
      function create() {
          //scroller = game.add.scrollZone('angelDawn', game.stage.centerX - 320, 100);
          game.world.setSize(w,h);
          speed = config.song.speed;
          sky = game.add.tileSprite(0, 0, w, h, 'sky');
          bg = game.add.tileSprite(0, h-600, w, 512, 'bg');
          bg2 = game.add.tileSprite(0, h-500, w, 512, 'bg2');
          vag = game.add.tileSprite(0, 200, w, 300, 'vag');
          car = game.add.sprite(w/2, h-200, 'car');
          car.body.velocity.x = 150;
      }
      function update(){
          speed = speed-0.0701;
          //speedIt(speed);
          car.velocity.x = 0;
          car.velocity.y = 0;
          car.angularVelocity = 0;
          car.angularAcceleration = 0;
          speedIt(speed);
          /*
          if(myGame.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            console.log(car.height);
            car.y = (car.height*2);
          }
          if(myGame.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            car.y = (car.height*3);
          }
         */
      }
      function speedIt(speed) {
        sky.tilePosition.x += speed*0.06;
        vag.tilePosition.x += speed*0.51;
        bg.tilePosition.x += speed*0.5;
        bg2.tilePosition.x += speed*0.7;
      }
  });
})(jQuery)
