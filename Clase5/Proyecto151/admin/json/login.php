<?php

    require "../inc/blacklist.php";
    require "../inc/inyeccion.php";
    require "../inc/config.php";
    require "../inc/registro.php";
    $peticion = "
        SELECT 
        * 
        FROM clientes 
        WHERE 
        usuario = '".$_GET['usuario']."'
        AND
        contrasena = '".sha1($_GET['contrasena'])."'";
    $resultado = mysqli_query($mysqli, $peticion);

    if ($fila = $resultado->fetch_array(MYSQLI_ASSOC)) { 
        echo '{"mensaje":"Tu usuario es correcto","usuario":"'.$_GET['usuario'].'"}';
    }else{
        echo '{"mensaje":"Acceso denegado"}';
    }
    

?>