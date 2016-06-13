<html>
<head>
  <title>YIT - Park Planner</title>
  <link rel="stylesheet" href="styles/foundation.css">
  <link rel="stylesheet" type="text/css" href="styles/style.css">

</head>
<body onresize="resizeCanvas()">
  <div class="background">
    <div id="canvas-container">
      <canvas id="canvas"></canvas>
    </div>
  </div>
  <div class="footer">
    <?php include 'scripts/items.php';?>
    <div class="footer-bg"></div>
  </div>
  <div id="copy">(c) Netlight</div>
  <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
  <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.2/fabric.js"></script>
  <script src="scripts/vendor/jquery.js"></script>
  <script src="scripts/vendor/what-input.js"></script>
  <script src="scripts/vendor/foundation.js"></script>
  <script type="text/javascript" src="scripts/items.js"></script>
  <script type="text/javascript" src="scripts/canvas.js"></script>
  <script type="text/javascript" src="scripts/fileSaver.js"></script>
  <script type="text/javascript" src="scripts/blob.js"></script>
  <script type="text/javascript">
  $(document).foundation();
  </script>
</body>
</html>
