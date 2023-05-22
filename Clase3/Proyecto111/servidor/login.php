<?php
    // Este archivo se conectaría a una base de datos para validar un usuario
    if(
        $_GET['usuario'] == "josevicente" 
        && 
        $_GET['contrasena'] == "josevicente"
    ){
        echo '{"mensaje":"Tu usuario es correcto"}';
    }else{
        echo '{"mensaje":"Acceso denegado"}';
    }
    

?>