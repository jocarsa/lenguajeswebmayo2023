{"entradas":[
<?php
$cadena = "";
$db = new mysqli("localhost", 
        "ideaoniric", 
        "ideaoniric", 
        "ideaoniric");
$peticion = "
SELECT 
entradas.imagen as imagen,
entradas.texto as texto,
entradas.fecha as fecha,
clientes.nombrecompleto as nombre
FROM entradas 
LEFT JOIN clientes
ON entradas.FK_usuarios_nombrereal = clientes.Identificador

ORDER BY fecha DESC";
$resultado = $db->query($peticion);
while ($fila = $resultado->fetch_array(MYSQLI_ASSOC)) {
    $cadena .=  '{
        "imagen":"'.$fila['imagen'].'",
        "texto":"'.$fila['texto'].'",
        "fecha":"'.$fila['fecha'].'",
        "usuario":"'.$fila['nombre'].'"
    },';
}

$cadena = substr_replace($cadena ,"", -1);
echo $cadena;
   
   
?>
]}