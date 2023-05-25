{"entradas":[
<?php
$cadena = "";
require "../inc/blacklist.php";
    require "../inc/inyeccion.php";
    require "../inc/config.php";
    require "../inc/registro.php";
$peticion = "
SELECT 
entradas.imagen as imagen,
entradas.texto as texto,
entradas.fecha as fecha,
clientes.nombrecompleto as nombre
FROM entradas 
LEFT JOIN clientes

ON entradas.FK_usuarios_nombrereal = clientes.Identificador
WHERE entradas.texto LIKE '%".$_GET['contenido']."%'
ORDER BY fecha DESC";
//echo $peticion;
$resultado = $db->query($peticion);
while ($fila = $resultado->fetch_array(MYSQLI_ASSOC)) {
    $cadena .=  '{
        "imagen":"'.$fila['imagen'].'",
        "texto":"'.$fila['texto'].'",
        "fecha":"'.$fila['fecha'].'"
    },';
}

$cadena = substr_replace($cadena ,"", -1);
echo $cadena;
   
   
?>

    

   
]}