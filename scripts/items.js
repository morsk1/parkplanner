for(var i = 1 ; i <= 35 ; i++){
  if(i < 10){
    addPicture("images/nature/trees/tree0"+i+".png","nature-images");
  }else{
    addPicture("images/nature/trees/tree"+i+".png","nature-images");
  }
}

for(var i = 1 ; i <= 46 ; i++){
    addPicture("images/water/waterTile"+i+".png","water-images");
}

for(var i = 1 ; i <= 6 ; i++){
    addPicture("images/terrain/terrainTile"+i+".png","terrain-images");
}

//All road images
for(var i = 1 ; i <= 27 ; i++){
    addPicture("images/road/asphalt/roadTile"+i+".png","asphalt-images");
}
for(var i = 1 ; i <= 90 ; i++){
  if(i < 10){
    addPicture("images/road/asphalt2/road_asphalt0"+i+".png","asphalt2-images");
  }else{
    addPicture("images/road/asphalt2/road_asphalt"+i+".png","asphalt2-images");
  }
}
for(var i = 1 ; i <= 90 ; i++){
  if(i < 10){
    addPicture("images/road/dirt2/road_dirt0"+i+".png","dirt2-images");
  }else{
    addPicture("images/road/dirt2/road_dirt"+i+".png","dirt2-images");
  }
}
for(var i = 1 ; i <= 90 ; i++){
  if(i < 10){
    addPicture("images/road/sand2/road_sand0"+i+".png","sand2-images");
  }else{
    addPicture("images/road/sand2/road_sand"+i+".png","sand2-images");
  }
}

function addPicture(src,divId){
  var elem = document.createElement("img");
  elem.src = src;
  elem.setAttribute("height", "50");
  elem.setAttribute("width", "50");
  elem.setAttribute("alt", "tree"+i);
  elem.setAttribute("draggable","true");
  document.getElementById(divId).appendChild(elem);
}

var list = ['asphalt-images','asphalt2-images','dirt2-images','sand2-images','terrain-images','water-images','items-images','nature-images'];

function showDiv(divid) {
  if(document.getElementById(divid).style.display == "block"){
    hideAll();
  } else {
    showItems(divid);
  }
}

function showItems(itemId){
  hideAll();
  document.getElementById(itemId).style.display = "block";
}

function hideAll(){
  for(var i = 0; i < list.length; i++){
    document.getElementById(list[i]).style.display = "none";
  }
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
