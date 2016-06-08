<html>
<head>
  <title>YIT - Park Planner</title>
  <link rel="stylesheet" type="text/css" href="styles/style.css">
</head>
<body onresize="resizeCanvas()">
  <div id="savedPicture">

  </div>
  <div class="background">
    <div id="canvas-container">
      <canvas id="canvas"></canvas>
    </div>
  </div>
  <div class="footer">
  <div class="buttons">
    <div class="dropdown">
      <button onclick="myFunction()" class="dropbtn">Road</button>
      <div id="myDropdown" class="dropdown-content">
        <button class="sub-dropbtn" onclick="javascript:showDiv('asphalt-images');">Asphalt</button>
        <button class="sub-dropbtn" onclick="javascript:showDiv('asphalt2-images');">Asphalt 2</button>
        <button class="sub-dropbtn" onclick="javascript:showDiv('dirt2-images');">Dirt</button>
        <button class="sub-dropbtn" onclick="javascript:showDiv('sand2-images');">Sand</button>
      </div>
    </div>
    <button class="dropbtn" onclick="javascript:showDiv('terrain-images');">Terrain</button>
    <button class="dropbtn" onclick="javascript:showDiv('water-images');">Water</button>
    <button class="dropbtn" onclick="javascript:showDiv('items-images');">Items</button>
    <button class="dropbtn" onclick="javascript:showDiv('nature-images');">Nature</button>

    <button class="dropbtn menu-btn" onclick="javascript:toggleGridLines();">Toggle grid</button>
    <button id="saveImage" class="dropbtn menu-btn" onclick="javascript:saveImage();">Save image</button>
  </div>
  <div id="images">

    <!-- Road containers -->
    <div id="asphalt-images" class="images"></div>
    <div id="asphalt2-images" class="images"></div>
    <div id="dirt2-images" class="images"></div>
    <div id="sand2-images" class="images"></div>


    <div class="terrain">
      <div id="terrain-images" class="images">
      </div>
    </div>
    <div class="water">
      <div id="water-images" class="images">
      </div>
    </div>
    <div class="items">
      <div id="items-images" class="images">
        <img draggable="true" src="images/greenstuff/bush.png" width="50" height="50"></img>
        <img draggable="true" src="images/greenstuff/bush2.png" width="50" height="50"></img>
        <img draggable="true" src="images/greenstuff/bush3.png" width="50" height="50"></img>
        <img draggable="true" src="images/greenstuff/pool.png" width="100" height="50"></img>
        <img draggable="true" src="images/greenstuff/tennis.png" width="100" height="50"></img>
        <img draggable="true" src="images/greenstuff/water.png" width="75" height="50"></img>

        <img draggable="true" src="images/playground/bench.png" width="50" height="50"></img>
        <img draggable="true" src="images/playground/pony.png" width="50" height="50"></img>
        <img draggable="true" src="images/playground/round.png" width="50" height="50"></img>
        <img draggable="true" src="images/playground/sandbox.png" width="50" height="50"></img>
        <img draggable="true" src="images/playground/slide.png" width="50" height="50"></img>
        <img draggable="true" src="images/playground/slide2.png" width="50" height="50"></img>
      </div>
    </div>
    <div id="nature-images" class="images">
    </div>
  </div>
  <div class="footer-bg">

  </div>

</div>
  <div id="copy">(c) Netlight</div>
  <script type="text/javascript" src="http://rawgithub.com/kangax/fabric.js/master/dist/all.js"></script>
  <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.5.0/fabric.js"></script>
  <script type="text/javascript" src="scripts/items.js"></script>
  <script type="text/javascript" src="scripts/canvas.js"></script>
</body>
</html>
