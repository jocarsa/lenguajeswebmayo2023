<?php

  
$myfile = fopen("usuarios.txt", "a") or die("Unable to open file!");

$txt = $_GET['usuario'].",".
        $_GET['contrasena'].",".
        $_GET['nombre'].",".
        $_GET['correo'].",".
        "\n";
fwrite($myfile, $txt);
fclose($myfile);


        echo '{"mensaje":"Tu usuario es correcto","usuario":"'.$_GET['usuario'].'"}';
    
    

?>