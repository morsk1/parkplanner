var lista = ['asphalt-images','asphalt2-images','dirt2-images','sand2-images','terrain-images','water-images','items-images','nature-images'];

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
  var z = document.getElementsByClassName("images");
  for(var i = 0; i < z.length; i++){
    z[i].style.display = "none";
  }
}

function myFunction(divid) {
    document.getElementById(divid).classList.toggle("show");
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
