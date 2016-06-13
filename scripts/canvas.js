/* Drag and Drop code adapted from http://www.html5rocks.com/en/tutorials/dnd/basics/ */

var canvas = new fabric.Canvas('canvas');
var grid = 25;
var gridVisible = true;
var w,h;
var ctrlDown = false;
var copiedObjects = new Array();
/*
NOTE: the start and end handlers are events for the <img> elements; the rest are bound to
the canvas container.
*/
var src = '../images/bg.png';

resizeCanvas();

canvas.setBackgroundColor({source: src, repeat: 'repeat'}, function () {
  canvas.renderAll();
});

canvas.preserveObjectStacking = false;

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
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
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
    e.preventDefault();
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

  //Copy paste function for canvas objects
  if (e.keyCode == 17) ctrlDown = true;
  if (ctrlDown && e.keyCode == 67) {
		//reset array with copied objects
    copiedObjects = [];

    //Get the activeObject and the ActiveGroup
    var activeObject = canvas.getActiveObject(),
      activeGroup = canvas.getActiveGroup();

    //If multiple items are selected the activeGroups will be true
    if (activeGroup) {
    	//get the objects from the activegroup
      var objectsInGroup = activeGroup.getObjects();
      //Discard the activeGroup
      canvas.discardActiveGroup();

      //Push all items from the activeGroup into our array
      objectsInGroup.forEach(function(object) {
        copiedObjects.push(object);
      });
    } else if (activeObject) { //If one item is selected then acriveObject will be true
      copiedObjects.push(activeObject); //push our selected item into the array
    }
  };
/*
  activeObject.clone(function(c) {
     canvas.add(c.set({ left: c.left+5, top: c.top+5}));
  });
*/

if (ctrlDown && e.keyCode == 86) {
    var count = 0;
    //Check if we have only one item we want to copy
    if (copiedObjects.length == 1) {
    	//check if we can handle async cloning
      if (fabric.util.getKlass(copiedObjects[0].type).async) {
        	copiedObjects[0].clone(function(clone) {

          //Add our item
          pasteOne(clone);

          //Select our item
          selectAll(1);
        });
      } else { //Sync cloning

      	//Add our item
        pasteOne(copiedObjects[0].clone());

        //Select our item
        selectAll(1);
      }
      //Handle multiple item copying
    } else if(copiedObjects.length > 1) {
      for (var index = (copiedObjects.length - 1); index >= 0; index--) {
      	//check if we can handle async cloning
        if (fabric.util.getKlass(copiedObjects[index].type).async) {
        		copiedObjects[index].clone(function(clone) {

            //Add our item
            pasteOne(clone);
            count++;
            //if we have added all our items we can now select them
            if (count == copiedObjects.length) {
              selectAll(copiedObjects.length);
            }
          });
        }else{ //sync cloning

        	//Add our item
        	pasteOne(copiedObjects[index].clone());

          count++;
          //if we have added all our items we can now select them
          if (count == copiedObjects.length) {
            selectAll(copiedObjects.length);
          }
        }
      }
    }
  }


  //Deleting of canvas objects
  if(e.keyCode == 46){
     var activeObject = canvas.getActiveObject(),
     activeGroup = canvas.getActiveGroup();
     if (activeGroup) {
       var objectsInGroup = activeGroup.getObjects();
       canvas.discardActiveGroup();
       objectsInGroup.forEach(function(object) {
           canvas.remove(object);
       });
     }
     else if (activeObject) {
      canvas.remove(activeObject);
      }
    }
}, false);

var pasteOne = function(clone) {
    clone.left += 100;
    clone.top += 100;
    //clone.set('canvas', canvas);
    clone.setCoords();
    canvas.add(clone);
};

// Update the selection
function selectAll(numberOfItems) {

    // Clear the selection
    canvas.deactivateAll();
    canvas.discardActiveGroup();

    // Handle group vs single object selections
    var objs = new Array();
    var canvasObjects = canvas.getObjects();
    var count = 0;
    for(var index = (canvasObjects.length - 1); index >= 0; index--){
      if(count < numberOfItems)objs.push(canvasObjects[index].set('active',true));

      count++;
    }

    var group = new fabric.Group(objs, {
      originX: 'center',
      originY: 'center'
    });

    canvas.setActiveGroup(group.setCoords()).renderAll();
}

document.addEventListener('keyup', function(e) {
  if (e.keyCode == 17) ctrlDown = false;
});

  function saveImage(){
    var fileName = prompt("Please enter your park name", "puisto");
    hideGridLines();
    var img = canvas.toDataURL("image/png");
    console.log(img);
    //var url = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    //location.href = url;

    var image_data = atob(img.split(',')[1]);
    // Use typed arrays to convert the binary data to a Blob
    var arraybuffer = new ArrayBuffer(image_data.length);
    var view = new Uint8Array(arraybuffer);
    for (var i=0; i<image_data.length; i++) {
        view[i] = image_data.charCodeAt(i) & 0xff;
    }
    try {
        // This is the recommended method:
        var blob = new Blob([arraybuffer], {type: 'application/octet-stream'});
    } catch (e) {
        // The BlobBuilder API has been deprecated in favour of Blob, but older
        // browsers don't know about the Blob constructor
        // IE10 also supports BlobBuilder, but since the `Blob` constructor
        //  also works, there's no need to add `MSBlobBuilder`.
        var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder);
        bb.append(arraybuffer);
        var blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
    }
    saveAs(blob, fileName+".png");
    /*
    $.ajax({
      type: "POST",
      url: "scripts/saveImage.php",
      data: { base64: img }
    }).done(function( msg ) {
      console.log(msg);
    });
    */
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
