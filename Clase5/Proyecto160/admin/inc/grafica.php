<?php
$titulo = $_GET['titulo'];
$cojodatos = $_GET['datos'];
$cojoseries = $_GET['series'];
$datos = explode(",",$cojodatos);
$series = explode(",",$cojoseries);
$numerodedatos = count($datos);
$suma = 0;
for($i = 0;$i<$numerodedatos;$i++){
    $suma += $datos[$i];
}
//echo "Hay ".$numerodedatos." elementos en el array";
//echo "<br>";
//echo "Su suma es de: ".$suma;
$imagen = imagecreatetruecolor(800, 400);
$blanco =  imagecolorallocate($imagen, 255,255,255);
$negro =  imagecolorallocate($imagen, 50,50,50);
imagefill($imagen, 0, 0, $blanco);
$posicionanterior = 0;
$fuente = './arial.ttf';
imagesetthickness($imagen, 5);
for($i = 0;$i<$numerodedatos;$i++){
    $color =  imagecolorallocate($imagen, rand(0,255), rand(0,255), rand(0,255));
    $inicio = $posicionanterior;
    $final = $posicionanterior+($datos[$i]/$suma)*360;
    $posicionanterior += ($datos[$i]/$suma)*360;
    $angulomedio = $inicio+($final-$inicio)/2;

    imagefilledarc(
        $imagen, 
        400, 
        200, 
        300, 
        300, 
        $inicio, 
        $final, 
        $color, 
        IMG_ARC_PIE);
    imageline($imagen, 
              400, 
              200, 
              400+cos(deg2rad($angulomedio))*180, 
              200+sin(deg2rad($angulomedio))*180, 
              $color);
    imageline($imagen, 
              400, 
              200, 
              400+cos(deg2rad($inicio))*150, 
              200+sin(deg2rad($inicio))*150, 
              $blanco);
    
    if( $angulomedio < 90 || $angulomedio > 270){
        imageline($imagen, 
              400+cos(deg2rad($angulomedio))*180, 
              200+sin(deg2rad($angulomedio))*180, 
              600, 
              200+sin(deg2rad($angulomedio))*180, 
              $color);
        imagettftext($imagen, 10, 0, 610, 200+sin(deg2rad($angulomedio))*180+5, $color, $fuente, $series[$i]." - ".$datos[$i]." - ".round((($datos[$i]/$suma)*100),2)."%");
    }
    if( $angulomedio > 90 && $angulomedio < 270){
        $dimensiones = imagettfbbox(10, 0, $fuente, $series[$i]." - ".$datos[$i]." - ".round((($datos[$i]/$suma)*100),2)."%");
        $anchura = abs($dimensiones[4] - $dimensiones[0]);
        
        imageline($imagen, 
              400+cos(deg2rad($angulomedio))*180, 
              200+sin(deg2rad($angulomedio))*180, 
              200, 
              200+sin(deg2rad($angulomedio))*180, 
              $color);
        imagettftext($imagen, 10, 0, 190-$anchura, 200+sin(deg2rad($angulomedio))*180+5, $color, $fuente, $series[$i]." - ".$datos[$i]." - ".round((($datos[$i]/$suma)*100),2)."%");
    }
}
imageline($imagen, 
              400, 
              200, 
              550, 
              200, 
              $blanco);
imagefilledellipse(
    $imagen, 
    400, 
    200, 
    100, 
    100,  
    $blanco);

imagettftext($imagen, 20, 0, 10, 30, $negro, $fuente, $_GET['titulo']);

header('Content-Type: image/jpeg');
imagejpeg($imagen);
imagedestroy($imagen);

?>