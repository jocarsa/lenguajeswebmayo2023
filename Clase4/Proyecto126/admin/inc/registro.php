<?php
    $actual_link = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $datos = "";
    foreach($_GET as $clave => $valor){$datos .= $clave.":".$valor.",";}
    foreach($_POST as $clave => $valor){$datos .= $clave.":".$valor.",";}
    $peticion = "
        INSERT INTO registros
        VALUES(
            NULL,
            '".date('U')."',
            '".$_SERVER['HTTP_USER_AGENT']."',
            '".$_SERVER['REMOTE_ADDR']."',
            '".$actual_link."',
            '".$datos."'
        )
        ";
        $resultado = mysqli_query($mysqli, $peticion);
?>