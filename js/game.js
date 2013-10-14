(function($) {
  $(document).on('newScreen', function(){
      var w = window.innerWidth;
      var h = window.innerHeight;
      var enimies = [];
      var positions = [];
      var config = getConfig();
      var time = 0;
      var speed = 0;
      var music;
      var car, sky, bg, bg2, vag, carPosition = 0;
      var clouds, stars;
      var score = 0;
      var tmp;
      var lastEnemy = 200;

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

          game.input.keyboard.onKeyDown = function(event) {
            if (event.keyCode === 38) {
              carPosition = carPosition < positions.length - 1 ? carPosition+1 : carPosition;
            }
            else if (event.keyCode === 40) {
              carPosition = carPosition > 0 ? carPosition-1 : 0;
            }
            game.add.tween(car).to({y: positions[carPosition]}, 50, Phaser.Easing.Linear.None, true);
          };

          var i = 0;
          for (i = 1; i < 9; i++) {
            game.load.image('cloud' + i, 'assets/moln_' + i + '.png');
          }
          clouds = new Clouds(game);

          for (i = 1; i < 3; i++) {
            game.load.image('star' + i, 'assets/stjarna_' + i + '.png');
          }
          game.load.image('trad', 'assets/hinder_trad1.png');
          game.load.image('snogubbe', 'assets/hinder_snogubbe.png');
          game.load.image('trad2', 'assets/hinder_trad2.png');
          stars = new Stars(game);
      }
      function create() {
          game.world.setSize(w,h);
          speed = config.song.speed;
          sky = game.add.tileSprite(0, 0, w, h, 'sky');
          vag = game.add.tileSprite(0, h-260, w, 300, 'vag');
          bg = game.add.tileSprite(0, h-400, w, 112, 'bg');
          bg2 = game.add.tileSprite(0, h-400, w, 172, 'bg2');
          car = game.add.sprite(w/2, h-200, 'car');
          car.body.setSize(100, 20, 70, 0);
          car.body.velocity.x = 150;

          music = game.add.audio('song');
          //music.play();

          car.x = 10;
          car.y = h - 210;
          carPosition = 1;
          positions = [
            h - 160,
            h - 210,
            h - 260
          ];

          clouds.create();
          stars.create();
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
        var toRemove = [], toKill = [];
        for (var i = 0, ii = enimies.length; i<ii;i++) {
          enimies[i].update(speed);
          var k = game.physics.collide(car, enimies[i].sprite, collision, null, this);
          if (k) {
            toRemove.push(i);
          }
          else if (enimies[i].sprite.x < -enimies[i].sprite.width) {
            toKill.push(i);
          }
        }
        // remove obstacles collided with
        for (var i = 0, ii= toRemove.length; i<ii;i++) {
          enimies.splice(toRemove[i], 1);
        }
        for (var i = 0, ii= toKill.length; i<ii;i++) {
          enimies[toKill[i]].sprite.kill();
          enimies.splice(toKill[i], 1);
        }

        // Increase score
        score += Math.round((1 * -speed) / 5);
        $('.score').text(score);

        // Generate enemies
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
  });
})(jQuery);

