{"mensajes":[
<?php
require "../inc/blacklist.php";
require "../inc/inyeccion.php";
require "../inc/config.php";
require "../inc/registro.php";

$peticion = "
        SELECT * FROM clientes WHERE usuario = '".$_GET['usuario']."'";
        $resultado = mysqli_query($mysqli, $peticion);

        while ($fila = $resultado->fetch_array(MYSQLI_ASSOC)) {
            $idusuario = $fila['Identificador'];
        }

$cadena = "";

$peticion = "
SELECT 
mensajes.mensaje as mensaje,
clientes.usuario as emisor
FROM mensajes
LEFT JOIN clientes
ON mensajes.emisor = clientes.Identificador
WHERE receptor = '".$idusuario."'
ORDER BY mensajes.Identificador DESC";

$resultado = $db->query($peticion);
while ($fila = $resultado->fetch_array(MYSQLI_ASSOC)) {
    $cadena .=  '{
        "usuario":"'.$fila['emisor'].'",
        "mensaje":"'.$fila['mensaje'].'",
        "fecha":"",
        "imagen":""
    },';
}

$cadena = substr_replace($cadena ,"", -1);
echo $cadena;
   
   
?>
   
]}