<html>
  <head>
    <title>Skogsbilväg</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0" />
    <link href="css/style.css" rel="stylesheet" />
    <script src="js/modernizr.js"></script>
    <?php if(isset($_GET['score'])): ?>
      <meta property="og:title" content="<?php echo $_GET['score'] ?>!!??! Otroliga poäng | Popterror | Skogsbilväg">
      <meta property="og:description" content="Jag fick <?php echo $_GET['score'] ?> poäng med hjäla av en bil och popterror. Hur många poäng kan du få med hjälp av det?" />
    <?php else: ?>
      <meta property="og:title" content="Popterror | Skogsbilväg">
      <meta property="og:description" content="Du, en bil och popterror. Hur många poäng kan du få med hjälp av det?" />
    <?php endif; ?>
    <meta property="og:image" content="http://popterror.se/wp-content/uploads/2013/10/Omslag-skogsbilv%C3%A4g.jpg">
  </head>
  <body>

    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=229990103819998";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>


    <div class="nosupport">
      <h1 class="logo">Popterror</h1>
      <p class="warning">
        Du behöver aktivera JavaScript samt ha en webbläsare med stöd för
        canvas för att spela Skogsbilväg!
      </p>
    </div>


    <div id="menu" class="screen active">
      <div class="forestback"></div>
      <div class="forest"></div>
      <div class="road"></div>

      <h1 class="logo">Popterror</h1>

      <p class="instructions">
        Använd upp- och nedpilarna för att styra bilen. Undvik att krocka med
        snögubbar och stockar. Om du krockar tappar du fart, ju högre fart du
        har desto högre poäng får du!
      </p>

      <ul class="options">
        <li><a href="#stage" class="button">Starta</a></li>
      </ul>

      <ul class="social">
        <li>
          <a href="http://open.spotify.com/artist/1acJ3usIJEYdIudcQ3ISsA">
            <img src="/assets/spotify.png" alt="Popterror på Spotify" />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/popterror">
            <img src="/assets/facebook.png" alt="Popterror på Facebook" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/popterrormusik">
            <img src="/assets/twitter.png" alt="Popterror på Twitter" />
          </a>
        </li>
      </ul>
    </div>

    <div id="stage" class="screen">
      <span class="score">0</span>
      <div class="end">
        <h2>Game Over</h2>
        <p>
          Bra styrt kompis! <br />Spela igen för att se om du kan få en ännu bättre
          poäng!
        </p>
        <p>
          <a href="" id="fb-sharelink">Dela med dig av ditt resultat med dina facebookkompisar</a>
        </p>
        <a id="restart" href="#stage">&rsaquo;&rsaquo; Spela igen! &lsaquo;&lsaquo;</a>
      </div>
    </div>

    <script src="js/jquery.js" type="text/javascript"></script>
    <script src="js/config.js" type="text/javascript"></script>
    <script src="js/phaser.js" type="text/javascript"></script>
    <script src="js/game.js" type="text/javascript"></script>
    <script src="js/clouds.js" type="text/javascript"></script>
    <script src="js/obstacle.js" type="text/javascript"></script>
    <script src="js/stars.js" type="text/javascript"></script>
    <script src="js/mountains.js" type="text/javascript"></script>
    <script src="js/app.js" type="text/javascript"></script>

    <audio preload="auto" autobuffer id="music" loop>
      <source src="assets/audio/popterror_-_skogsbilvag.mp3" />
      <source src="assets/audio/popterror_-_skogsbilvag.ogg" />
    </audio>
  </body>
</html>

