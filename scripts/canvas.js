/* Drag and Drop code adapted from http://www.html5rocks.com/en/tutorials/dnd/basics/ */

var canvas = new fabric.Canvas('canvas');
var grid = 25;
var gridVisible = true;
var w,h;
/*
NOTE: the start and end handlers are events for the <img> elements; the rest are bound to
the canvas container.
*/
var src = '../images/terrain/terrainTile3.png';

resizeCanvas();

canvas.setBackgroundColor({source: src, repeat: 'repeat'}, function () {
  canvas.renderAll();
});

function resizeCanvas(){
  removeGridLines();
  w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)-50;
  h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-300;
  canvas.setWidth(w);
  canvas.setHeight(h);
  addGridLines();
  canvas.renderAll();
}


function handleDragStart(e) {
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
    this.classList.add('img_dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
    // NOTE: comment above refers to the article (see top) -natchiketa

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
}

function handleDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    var img = document.querySelector('#images img.img_dragging');

    var x_cord, y_cord;

    if(e.layerX % 25 > 12.5){
      x_cord = e.layerX + (25 - (e.layerX % 25));
    } else {
      x_cord = e.layerX - (e.layerX % 25);
    }


    if(e.layerY % 25 > 12.5){
      y_cord = e.layerY + (25 - (e.layerY % 25));
    } else {
      y_cord = e.layerY - (e.layerY % 25);
    }

    var newImage = new fabric.Image(img, {
        width: img.width,
        height: img.height,
        // Set the center of the new object based on the event coordinates relative
        // to the canvas container.
        left: x_cord,
        top: y_cord,
        hasBorders: false,
        hasControls: true,
        hasRotatingPoint: true,
        lockScalingX: true,
        lockScalingY: true,
        borderColor: 'red',
        cornerColor: 'red',
        cornerSize: 7,
        transparentCorners: false
    });
    canvas.add(newImage);

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
}

if (Modernizr.draganddrop) {
    // Browser supports HTML5 DnD.

    // Bind the event listeners for the image elements
    var images = document.querySelectorAll('#images img');
    [].forEach.call(images, function (img) {
        img.addEventListener('dragstart', handleDragStart, false);
        img.addEventListener('dragend', handleDragEnd, false);
    });
    // Bind the event listeners for the canvas
    var canvasContainer = document.getElementById('canvas-container');
    canvasContainer.addEventListener('dragenter', handleDragEnter, false);
    canvasContainer.addEventListener('dragover', handleDragOver, false);
    canvasContainer.addEventListener('dragleave', handleDragLeave, false);
    canvasContainer.addEventListener('drop', handleDrop, false);
} else {
    // Replace with a fallback to a library solution.
    alert("This browser doesn't support the HTML5 Drag and Drop API.");
}

canvas.on('object:moving', function(options) {
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});

var angles = [0, 90, 180, 270, 360];

canvas.on("object:rotating", function(rotEvtData) {
    var targetObj = rotEvtData.target;
    var angle = targetObj.angle % 360;
    for (var i=0; i < angles.length; i++) {
       if (angle <=  angles[i]) {
          targetObj.angle = angles[i];
          break;
       }
    }
  });

  document.addEventListener('keydown', function (e) {
       if(e.keyCode == 46){
         canvas.getActiveObject().remove();
       }
  }, false);

  function saveImage(){
    hideGridLines();
    var img = canvas.toDataURL("image/png");
    var elem = document.createElement("img");
    elem.src = img;
    var myWindow = window.open("", "MsgWindow", "width=1205,height=800");
    myWindow.document.write("<img src='"+img+"' />");
    showGridLines();
  }

    function removeGridLines(){
      canvas.forEachObject(function(obj){
        if(obj.name == "gridLine"){
          canvas.remove(obj);
        }
      });
    }

  function addGridLines(){
    for (var i = 0; i < (w / grid); i++) {
      var line = new fabric.Line([ i * grid, 0, i * grid, h], { stroke: '#ccc', selectable: false });
      line.name = "gridLine";
      canvas.add(line);
      canvas.sendToBack(line);
    }
    for(var i = 0; i < (h / grid); i++) {
      var line = new fabric.Line([ 0, i * grid, w, i * grid], { stroke: '#ccc', selectable: false });
      line.name = "gridLine";
      canvas.add(line)
      canvas.sendToBack(line);
    }
  }

  function showGridLines(){
    gridVisible = true;
    canvas.forEachObject(function(obj){
      if(obj.name == "gridLine"){
        obj.setOpacity(1);
      }
    });
    canvas.renderAll();
  }

  function hideGridLines(){
    gridVisible = false;
    canvas.forEachObject(function(obj){
      if(obj.name == "gridLine"){
        obj.setOpacity(0);
      }
    });
    canvas.renderAll();
  }

  function toggleGridLines(){
    if(gridVisible){
      hideGridLines();
    } else {
      showGridLines();
    }
  }
