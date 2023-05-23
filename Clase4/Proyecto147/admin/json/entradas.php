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
clientes.nombrecompleto as nombre,
entradas.Identificador as Identificador
FROM entradas 
LEFT JOIN clientes
ON entradas.FK_usuarios_nombrereal = clientes.Identificador

ORDER BY fecha DESC";
$resultado = $db->query($peticion);
while ($fila = $resultado->fetch_array(MYSQLI_ASSOC)) {
    $cadena .=  '{
        "Identificador":"'.$fila['Identificador'].'",
        "imagen":"'.$fila['imagen'].'",
        "texto":"'.html_entity_decode($fila['texto']).'",
        "fecha":"'.$fila['fecha'].'",
        "usuario":"'.$fila['nombre'].'",
        "comentarios":[';
    
            $peticion2 = "
            SELECT 
            * FROM comentarios WHERE identrada = '".$fila['Identificador']."'";
            $resultado2 = $db->query($peticion2);
    $contador = 0;
            while ($fila2 = $resultado2->fetch_array(MYSQLI_ASSOC)) {
                $cadena .= '{"texto":"'.$fila2['mensaje'].'"},';
                $contador++;
            }
            if($contador > 0){
                $cadena = substr_replace($cadena ,"", -1);
            }
        
        $cadena .= ']
    },';
}

$cadena = substr_replace($cadena ,"", -1);
echo $cadena;
   
   
?>
]}