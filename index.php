<!DOCTYPE html>
<html>
<head>
  <title>Skogsbilväg &mdash; Popterror</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="/css/master.css" />
  <script data-main="/js/app.js" src="/js/require.js"></script>
</head>
<body>
  <div id="legacyBrowser">
    Du har ingen canvas :(
  </div>
  <a id="start" href="#">
    <h2 id="motorAway">Start song: Motoraway</h2>
    <p>or</p>
    <h2 id="jaguar">Start song: Jaguar</h2>
  </a>
  <div id="content"> </div>
  <div id="car"></div>
  <audio id="song-jaguar">
    <source src="media/jaguar.mp3" type="audio/mpeg">
    <source src="media/jaguar.ogg" type="audio/ogg">
  </audio>
  <audio id="song-motorAway">
    <source src="media/motorAway.mp3" type="audio/mpeg">
    <source src="media/motorAway.ogg" type="audio/ogg">
  </audio>
</body>
</html>

