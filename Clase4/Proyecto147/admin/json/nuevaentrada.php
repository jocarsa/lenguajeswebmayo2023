<?php
require "../inc/blacklist.php";
require "../inc/inyeccion.php";
require "../inc/config.php";
require "../inc/registro.php";


$peticion = "
SELECT * FROM clientes WHERE usuario = '".$_POST['usuario']."'";
$resultado = mysqli_query($mysqli, $peticion);

while ($fila = $resultado->fetch_array(MYSQLI_ASSOC)) {
    $idusuario = $fila['Identificador'];
}

$peticion = "
INSERT 
INTO entradas 
VALUES
(NULL,
'".$_FILES["file"]["name"]."',
'".date('U')."',
'".$_POST['mensaje']."',
'titulo',
'".$idusuario."')";
//echo $peticion;
mysqli_query($mysqli, $peticion);
// Subo la imagen
$directorio = "../foto/";
$archivo = $directorio . basename($_FILES["file"]["name"]);
move_uploaded_file($_FILES["file"]["tmp_name"], $archivo);
   echo '{"mensaje":"Tu usuario es correcto","usuario":"'.$_GET['usuario'].'"}';
?>