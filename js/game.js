(function() {
  window.onload = function(){
      var w = window.innerWidth;
      var h = window.innerHeight;
      var enimies = [];
      var isDead = false;
      var config = getConfig();
      //var tune = document.getElementById('song-motorAway');
      var time = 0;
      var speed = 0;
      var myGame = new Phaser.Game(this, 'game', w, h, init, create, update);
      function init() {
          myGame.loader.addImageFile('bg', 'assets/trad_bak.png');
          myGame.loader.addImageFile('bg2', 'assets/trad_fram.png');
          myGame.loader.addImageFile('vag', 'assets/vag_streck.png');
          myGame.loader.addImageFile('car', 'assets/bil.png');
          myGame.loader.load();
      }
      function create() {
          myGame.camera.setBounds(0, 0, myGame.stage.width, myGame.stage.height);
          speed = config.song.speed;
          myGame.createScrollZone('bg').setSpeed(-speed, 0);
          myGame.createScrollZone('bg2').setSpeed(-speed*0.3, 0);
          myGame.createScrollZone('vag').setSpeed(-speed, 0);
          car = myGame.createSprite(w/2, h-200, 'car');
          car.maxVelocity.setTo(150, 150);
      }
      function update(){
          car.velocity.x = 0;
          car.velocity.y = 0;
          car.angularVelocity = 0;
          car.angularAcceleration = 0;
      }
  }
})()
