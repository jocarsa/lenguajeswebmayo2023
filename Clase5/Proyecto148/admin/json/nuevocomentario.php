<?php
require "../inc/blacklist.php";
require "../inc/inyeccion.php";
require "../inc/config.php";
require "../inc/registro.php";
    $peticion = "
        SELECT * FROM clientes WHERE usuario = '".$_GET['remitente']."'";
        $resultado = mysqli_query($mysqli, $peticion);

        while ($fila = $resultado->fetch_array(MYSQLI_ASSOC)) {
            $idremitente = $fila['Identificador'];
        }



$peticion = "
INSERT 
INTO comentarios 
VALUES
(NULL,
'".$idremitente."',
'".date('U')."',
'".$_GET['idpost']."',
'".$_GET['mensaje']."'
)";
//echo $peticion;
mysqli_query($mysqli, $peticion);


?>