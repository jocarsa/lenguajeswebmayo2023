{"entradas":[
<?php
$cadena = "";
require "../inc/blacklist.php";
    require "../inc/inyeccion.php";
    require "../inc/config.php";
    require "../inc/registro.php";
if(!isset($_GET['posicion'])){
    $_GET['posicion'] = 0;
}
$peticion = "
SELECT 
entradas.imagen as imagen,
entradas.texto as texto,
entradas.fecha as fecha,
clientes.nombrecompleto as nombre,
entradas.Identificador as Identificador,
clientes.foto AS foto
FROM entradas 
LEFT JOIN clientes
ON entradas.FK_usuarios_nombrereal = clientes.Identificador
WHERE privado != 1
ORDER BY fecha DESC
LIMIT 5 OFFSET ".$_GET['posicion']."
";
$resultado = $db->query($peticion);
while ($fila = $resultado->fetch_array(MYSQLI_ASSOC)) {
    $cadena .=  '{
        "Identificador":"'.$fila['Identificador'].'",
        "imagen":"'.$fila['imagen'].'",
        "texto":"'.html_entity_decode($fila['texto']).'",
        "fecha":"'.$fila['fecha'].'",
        "usuario":"'.$fila['nombre'].'",
        "foto":"'.$fila['foto'].'",
        "comentarios":[';
    
            $peticion2 = "
            SELECT 
            comentarios.mensaje AS mensaje,
            clientes.usuario as usuario
            FROM comentarios 
            LEFT JOIN clientes ON comentarios.remitente = clientes.Identificador
            WHERE identrada = '".$fila['Identificador']."'";
            $resultado2 = $db->query($peticion2);
    $contador = 0;
            while ($fila2 = $resultado2->fetch_array(MYSQLI_ASSOC)) {
                $cadena .= '{"texto":"'.$fila2['mensaje'].'","usuario":"'.$fila2['usuario'].'"},';
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