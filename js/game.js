(function($) {
  $(document).on('newScreen', function(){
      var w = window.innerWidth;
      var h = window.innerHeight;
      var enimies = [];
      var positions = [];
      var config = getConfig();
      //var tune = document.getElementById('song-motorAway');
      var time = 0;
      var speed = 0;
      var music;
      var car, sky, bg, bg2, vag, carPosition = 0;
      var clouds;

      var game = new Phaser.Game(w, h, Phaser.CANVAS, 'stage', { preload: init, create: create, update: update });
      window.game = game;
      function init() {
          game.load.image('sky', 'assets/himmel.png');
          game.load.image('bg', 'assets/trad_bak.png');
          game.load.image('bg2', 'assets/trad_fram.png');
          game.load.image('vag', 'assets/vag_streck.png');
          game.load.image('car', 'assets/bil.png');
          game.load.audio('song', [
            'assets/audio/popterror_-_skogsbilvag.mp3',
            'assets/audio/popterror_-_skogsbilvag.ogg',
          ]);
          //myGame.load.load();
          game.input.keyboard.onKeyDown = function(event) {
            if (event.keyCode === 38) {
              carPosition = carPosition < positions.length - 1 ? carPosition+1 : carPosition;
            }
            else if (event.keyCode === 40) {
              carPosition = carPosition > 0 ? carPosition-1 : 0;
            }
            game.add.tween(car).to({y: positions[carPosition]}, 50, Phaser.Easing.Linear.None, true);
          };

          game.load.image('cloud1', 'assets/moln_1.png');
          game.load.image('cloud2', 'assets/moln_2.png');
          game.load.image('cloud3', 'assets/moln_3.png');
          game.load.image('cloud4', 'assets/moln_4.png');
          game.load.image('cloud5', 'assets/moln_5.png');
          game.load.image('cloud6', 'assets/moln_6.png');
          game.load.image('cloud7', 'assets/moln_7.png');
          game.load.image('cloud8', 'assets/moln_8.png');

          clouds = new Clouds(game);
      }
      function create() {
          game.input.onDown =  function(){
            console.log('adfasdf');
          };
          //scroller = game.add.scrollZone('angelDawn', game.stage.centerX - 320, 100);
          game.world.setSize(w,h);
          speed = config.song.speed;
          sky = game.add.tileSprite(0, 0, w, h, 'sky');
          vag = game.add.tileSprite(0, h-260, w, 300, 'vag');
          bg = game.add.tileSprite(0, h-400, w, 112, 'bg');
          bg2 = game.add.tileSprite(0, h-400, w, 172, 'bg2');
          car = game.add.sprite(w/2, h-200, 'car');
          car.body.velocity.x = 150;

          music = game.add.audio('song');
          music.play();

          car.x = 10;
          car.y = h - 210;
          carPosition = 1;
          positions = [
            h - 160,
            h - 210,
            h - 260
          ];

          clouds.create();
      }
      function update(){
          speed = speed-0.0301;
          //speedIt(speed);
          car.velocity.x = 0;
          car.velocity.y = 0;
          car.angularVelocity = 0;
          car.angularAcceleration = 0;
          speedIt(speed);

          clouds.update(speed);
      }

      function speedIt(speed) {
        sky.tilePosition.x += speed*0.06;
        vag.tilePosition.x += speed*0.75;
        bg.tilePosition.x += speed*0.5;
        bg2.tilePosition.x += speed*0.7;
      }
  });
})(jQuery);

