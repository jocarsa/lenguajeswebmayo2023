<?php
require "../inc/blacklist.php";
require "../inc/inyeccion.php";
require "../inc/config.php";
require "../inc/registro.php";


$peticion = "
UPDATE clientes SET foto = '".$_FILES["file"]["name"]."' WHERE usuario = '".$_POST['usuario']."' ";


mysqli_query($mysqli, $peticion);
// Subo la imagen
$directorio = "../fotosusuario/";
$archivo = $directorio . basename($_FILES["file"]["name"]);



move_uploaded_file($_FILES["file"]["tmp_name"], $archivo);


echo "ok";
  
?>
