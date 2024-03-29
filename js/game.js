(function($) {

  var config = getConfig();
  var time = 0, score = 0, speed = 0, gameover = false, gameTime = 60 * 1000;
  var reset = function() {
    score = 0;
    speed = config.song.speed;
    gameover = false;
  };
  function gameOver() {
    gameover = true;
    $('#stage').addClass('gameover');
    var poangUrl = encodeURIComponent(config.url + '?score=' + score);
    $('#fb-sharelink').attr('href', 'https://www.facebook.com/sharer/sharer.php?u='+ poangUrl);
  }

  $(document).on('restart', function() {
    reset();
    setTimeout(gameOver, gameTime);
  });

  $(document).on('newScreen', function(event, screen){
      if (screen !== 'stage') return;
      var w = $('#stage').width();
      var h = $('#stage').height();
      var enimies = [];
      var positions = [];
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
      var lastEnemy = 200;
      var game = new Phaser.Game(w, h, Phaser.CANVAS, 'stage', { preload: init, create: create, update: update });

      function init() {
          gameover = false;
          mountains = new Mountains(game);
          game.load.image('logo', 'assets/popterror.png');
          game.load.image('sky', 'assets/himmel.png');
          game.load.image('bg', 'assets/trad_bak.png');
          game.load.image('bg2', 'assets/trad_fram.png');
          game.load.image('vag', 'assets/vag_brun.png');
          game.load.image('ground', 'assets/mark.png');
          game.load.image('car', 'assets/bil.png');
          game.load.image('moon', 'assets/moon.png');

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
          game.load.image('alg', 'assets/hinder_alg.png');
          game.load.image('alien', 'assets/hinder_alien.png');
          game.load.image('barnvagn', 'assets/hinder_barnvagn.png');
          game.load.image('bil', 'assets/hinder_bil.png');
          game.load.image('rav', 'assets/hinder_rav.png');
          game.load.image('sten', 'assets/hinder_sten.png');
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
          game.add.sprite(w - (50 + 41), 50, 'moon');
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

          document.getElementById('music').play();
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
      }
  });
})(jQuery);

