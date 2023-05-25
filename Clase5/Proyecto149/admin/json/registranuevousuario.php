<?php
require "../inc/blacklist.php";
require "../inc/inyeccion.php";
require "../inc/config.php";
require "../inc/registro.php";

$peticion = "
INSERT 
INTO clientes 
VALUES
(NULL,
'".$_GET['nombre']."',
'".$_GET['correo']."',
'".$_GET['usuario']."',
'".sha1($_GET['contrasena'])."',
'')";
//echo $peticion;
mysqli_query($mysqli, $peticion);

   echo '{"mensaje":"Tu usuario es correcto","usuario":"'.$_GET['usuario'].'"}';
?>
