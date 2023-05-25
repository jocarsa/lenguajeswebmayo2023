<?php
// Me conecto a la base de datos
require "../inc/blacklist.php";
    require "../inc/inyeccion.php";
    require "../inc/config.php";
    require "../inc/registro.php";
// Creo un array vacío
$jsonArray = [];
// Preparo una petición
$peticion = "
    SELECT * 
    FROM usuarios
    WHERE nombredeusuario = '".$_GET['usuario']."'
    ";
// La lanzo a la base de datos
$results = $db->query($peticion);
// REcupero los resultados línea a línea
while ($row = $results->fetch_array(MYSQLI_ASSOC)) {
    // Los añado al array
    $jsonArray[] = $row;
}
// Lo convierto y devuelvo en formato JSON
echo json_encode($jsonArray);
   
   
?>