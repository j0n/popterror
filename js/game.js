(function($) {
  $(document).on('newScreen', function(event, screen){
      if (screen !== 'stage') return;
      $('canvas').remove();

      var w = $('#stage').width();
      var h = $('#stage').height();
      var enimies = [];
      var positions = [];
      var config = getConfig();
      var time = 0;
      var speed = 0;
      var music,
          scoreHolder,
          car,
          sky,
          bg,
          bg2,
          vag,
          carPosition = 0,
          ground,
          clouds,
          stars,
          mountains;
      var score = 0;
      var lastEnemy = 200;
      var game = new Phaser.Game(w, h, Phaser.CANVAS, 'stage', { preload: init, create: create, update: update });
      var gameTime = 3 * 1000; // Length of one game
      var gameover = false;

      window.game = game;
      function init() {
          gameover = false;
          mountains = new Mountains(game);
          game.load.image('logo', 'assets/popterror.png');
          game.load.image('sky', 'assets/himmel.png');
          game.load.image('bg', 'assets/trad_bak.png');
          game.load.image('bg2', 'assets/trad_fram.png');
          game.load.image('vag', 'assets/vag_streck.png');
          game.load.image('ground', 'assets/mark.png');
          game.load.image('car', 'assets/bil.png');
          game.load.image('moon', 'assets/moon.png');
          game.load.audio('song', [
            'assets/audio/popterror_-_skogsbilvag.mp3',
            'assets/audio/popterror_-_skogsbilvag.ogg',
          ]);

          game.input.keyboard.onKeyDown = function(event) {
            if (event.keyCode === 38) {
              carPosition = carPosition < positions.length - 1 ? carPosition+1 : carPosition;
            }
            else if (event.keyCode === 40) {
              carPosition = carPosition > 0 ? carPosition-1 : 0;
            }
            game.add.tween(car).to({y: positions[carPosition]}, 50, Phaser.Easing.Linear.None, true);
          };

          for (i = 1; i < 3; i++) {
            game.load.image('star' + i, 'assets/stjarna_' + i + '.png');
          }
          game.load.image('trad', 'assets/hinder_trad1.png');
          game.load.image('snogubbe', 'assets/hinder_snogubbe.png');
          game.load.image('trad2', 'assets/hinder_trad2.png');
          stars = new Stars(game);

          var i = 0;
          for (i = 1; i < 9; i++) {
            game.load.image('cloud' + i, 'assets/moln_' + i + '.png');
          }
          clouds = new Clouds(game);

      }
      function create() {
          game.world.setSize(w,h);
          speed = config.song.speed;
          sky = game.add.tileSprite(0, 0, w, h, 'sky');
          mountains.create();
          clouds.create();
          vag = game.add.tileSprite(0, h-198, w, 198, 'vag');
          ground = game.add.tileSprite(0, h - 198 - 30, w, 63, 'ground');
          bg = game.add.tileSprite(0, h-196-63-80, w, 112, 'bg');
          bg2 = game.add.tileSprite(0, h-196-63-80, w, 172, 'bg2');
          car = game.add.sprite(w/2, h-150, 'car');

          car.body.setSize(100, 20, 70, 0);
          car.body.velocity.x = 150;
          scoreHolder = $('.score');

          game.add.sprite(w - (50 + 41), 50, 'moon');

          music = game.add.audio('song');
          //music.play();

          car.x = 30;
          car.y = h - 150;
          carPosition = 1;
          positions = [
            h - 100,
            h - 150,
            h - 200
          ];
          car.velocity.x = 0;
          car.velocity.y = 0;
          car.angularVelocity = 0;
          car.angularAcceleration = 0;

          stars.create();

          setTimeout(gameOver, gameTime);
      }
      function update(){
        clouds.update(speed);
        if (gameover) {
          car.x += speed * -1;
          return;
        }

        speed = speed-0.0301;
        car.x = 10;
        speedIt(speed);
        clouds.update(speed);
        mountains.update(speed);

        var toRemove = [], toKill = [];
        //console.log(enimies.length);
        for (var i = 0, ii = enimies.length; i<ii; i++) {
          if (enimies[i]) {
            enimies[i].update(speed);
            var k = game.physics.collide(car, enimies[i].sprite, collision, null, this);
            if (k) {
              enimies.splice(i, 1);
              i--;
              //toRemove.push(i);
            }
            else if (enimies[i].sprite.x < -enimies[i].sprite.width) {
              enimies[i].sprite.kill();
              enimies.splice(i, 1);
              i--;
              //toKill.push(i);
            }
          }
        }

        // Increase score
        score += Math.round((1 * -speed) / 5);
        scoreHolder.text(score);

        // Generate enemies
        //
        lastEnemy += speed*0.75;
        if (lastEnemy < 0) {
          lastEnemy = ~~(Math.random() * 400) + 400;
          var pos = Math.floor(Math.random() * 3);
          enimies.push(new Obstacle(game, w, h, positions, pos));
          if (Math.random() > 0.7) {
            var posSecond = pos;
            while (posSecond === pos) posSecond = Math.floor(Math.random() * 3);
            enimies.push(new Obstacle(game, w, h, positions, posSecond));
          }
        }
      }

      function speedIt(speed) {
        sky.tilePosition.x += speed*0.01;
        vag.tilePosition.x += speed*0.75;
        bg.tilePosition.x += speed*0.5;
        bg2.tilePosition.x += speed*0.7;
        ground.tilePosition.x += speed * 0.7;
      }
      function collision(car, obstacle) {
        speed = speed * 0.6;
        obstacle.allowRotation = true;
        obstacle.velocity.x = -90*speed;
        obstacle.velocity.y = 15*speed;
        obstacle.angularVelocity = 15*speed;
        obstacle.angularAcceleration = 100;

        /*
        var emitter = game.add.emitter(car.x-car.width, obstacle.y);
        emitter.maxParticleSpeed.setTo(speed*3, 10);
        emitter.minParticleSpeed.setTo(speed, 50);
        emitter.makeParticles(obstacle.key, [0]);
        emitter.start(true, 4000, 15);
        */
      }

      function gameOver() {
        gameover = true;
        $('#stage').addClass('gameover');
      }
  });
})(jQuery);

