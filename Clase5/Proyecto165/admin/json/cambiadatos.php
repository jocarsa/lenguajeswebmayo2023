<?php
$cadena = "";
require "../inc/blacklist.php";
    require "../inc/inyeccion.php";
    require "../inc/config.php";
    require "../inc/registro.php";

if($_GET['dato'] != "contrasena"){
    $peticion = "
    UPDATE clientes
    SET ".$_GET['dato']." = '".$_GET['valor']."'
    WHERE usuario = '".$_GET['usuario']."'
    ";
    }else{
    $peticion = "
    UPDATE clientes
    SET ".$_GET['dato']." = '".sha1($_GET['valor'])."'
    WHERE usuario = '".$_GET['usuario']."'
    ";
}
$resultado = $db->query($peticion);

   
?>
