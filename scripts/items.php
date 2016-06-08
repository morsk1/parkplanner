<?php

function createButtons($dir){
  $ffs = scandir($dir);
  $sub_list = array();
  $dd = false;
  $files = 0;
  $dirs = glob($dir."/*", GLOB_ONLYDIR);
  $files = glob($dir."/*");
  if(count($dirs) != 0 && $dir != "images"){
    echo '<li>';
    echo '<a href="#" class="high_level_menu_item">'.$dir.'</a>';
    echo '<ul class="menu">';
    $dd = true;
  }

  foreach($ffs as $ff){

    if ($ff != '.' && $ff != '..'){

      if(is_dir($dir.'/'.$ff)){
        $dirs2 = glob($dir.'/'.$ff.'/*', GLOB_ONLYDIR);
        $sub_list[] = $dir.'/'.$ff;
        if(count($dirs2) == 0 && $dd == false){
          echo '<li><a href="#" class="high_level_menu_item" onclick="javascript:showDiv(\''.str_replace('/', '_',$dir).'_'.$ff.'\');">'.$dir.'/'.$ff.'</a></li>';
        }elseif($dir != "images"){
          echo '<li><a href="#" onclick="javascript:showDiv(\''.str_replace('/', '_',$dir).'_'.$ff.'\');">'.$dir.'/'.$ff.'</a></li>';
        }
      }
    }
  }
  if(count($dirs) != 0 && $dir != "images"){
    echo '</ul></li>';
  }
  $dirs = 0;
  foreach ($sub_list as $value) {
    createButtons($value);
  }
}

function listFolderFiles($dir){
    $ffs = scandir($dir);
    $sub_list = array();
    $files = 0;
    $dirs = glob($dir."/*", GLOB_ONLYDIR);
    $files = glob($dir."/*");
    if((count($files) - count($dirs)) != 0){

      echo '<div class="images" id="'.str_replace('/', '_',$dir).'">';
    }

    foreach($ffs as $ff){

      if ($ff != '.' && $ff != '..'){

        if(is_dir($dir.'/'.$ff)){

          $sub_list[] = $dir.'/'.$ff;

        } elseif ($ff != '.' && $ff != '..'){
          echo '<img draggable="true" src="'.$dir.'/'.$ff.'" width="50" height="50"></img>';
        }
      }
    }
    if((count($files) - count($dirs)) != 0){
      echo '</div>';
    }
    $files = 0;
    $hi = 0;
    foreach ($sub_list as $value) {
      $hi++;

      listFolderFiles($value);
    }
}
echo "<ul class='dropdown menu buttons' data-dropdown-menu>";
createButtons('images');
echo '<li><a href="#" class="high_level_menu_item" onclick="javascript:toggleGridLines();">Toggle grid</a></li>';
echo '<li><a href="#" class="high_level_menu_item" onclick="javascript:saveImage();">Save image</a></li>';
echo "</ul>";
echo "<div id='images'>";
listFolderFiles('images');
echo "</div>";

function consoleLog($value){
  echo "<script>console.log('".$value."');</script>";
}
?>
