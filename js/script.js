window.onload = function(){
(function () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var enimies = [];
    var isDead = false;
    var config = getConfig();
    var tune = document.getElementById('song-motorAway');
    var time = 0;
    var speed = 0;
    var myGame = new Phaser.Game(this, 'game', w, h, init, create, update);
    function init() {
        tune.addEventListener('timeupdate', function(){
            time = Math.floor(tune.currentTime);
        });
        tune.play()
        myGame.loader.addImageFile('bg', 'img/bg_small.png');
        myGame.loader.addImageFile('car', 'img/car.png');
        myGame.loader.load();
    }
    function create() {
        myGame.camera.setBounds(0, 0, myGame.stage.width, myGame.stage.height);
        speed = config.song.speed;
         myGame.createScrollZone('bg').setSpeed(0, speed);
         console.log(config.song.speed);
        car = myGame.createSprite(w/2, h-100, 'car');
        car.maxVelocity.setTo(150, 150);
        for (var i = 0; i < 10; i++){
            setTimeout(function(){
                circle = myGame.createGeomSprite(w/2 + (Math.random()*100 - 40));
                circle.createCircle(64);
                circle.velocity.y = (-speed)*50 + 350;
                enimies.push(circle);
            }, i*1000);
        }
       
    }
    function update(){
        car.velocity.x = 0;
        car.velocity.y = 0;
        car.angularVelocity = 0;
        car.angularAcceleration = 0;
        if (!isDead){
            if(myGame.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                var motion = myGame.motion.velocityFromAngle(car.angle, 300);
                car.velocity.copyFrom(motion);
            }
            if(myGame.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                var motion = myGame.motion.velocityFromAngle(car.angle, -300);
                car.velocity.copyFrom(motion);
            }
        }
        for (var i = 0, ii = enimies.length; i<ii;i++){
            enimies[i].velocity.y = (-speed)*50 + 350;
            myGame.collide(car, enimies[i], crash);
        }
        if (typeof config.car[time] != 'undefined') {
            if (config.car[time].action == 'spin') {
                car.rotation += 6;
            }
        }
        if (typeof config.song[time] != 'undefined') {
            if (typeof config.song[time].speed != 'undefined'){
                console.log('new speed', config.song[time].speed);
                config.song[time].speed = config.song[time].speed;
                myGame.createScrollZone('bg').setSpeed(0, config.song[time].speed);
            }
        }
        
    }
    function crash(a, b){
        emitter = myGame.createEmitter(car.getScreenXY()._x, car.getScreenXY()._y);
        emitter.makeParticles(null, 50, 0, false, 0);
        emitter.start(true);
        document.getElementById('dead').style.display = 'block';
        isDead = true;
        crash = function(){

        }
    }
})();
}
