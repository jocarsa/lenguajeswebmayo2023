<?php
    $myfile = fopen("mensajes.txt", "a") or die("Unable to open file!");
        fwrite($myfile, $_GET['remitente'].",".$_GET['destinatario'].",".$_GET['mensaje']."\n");
        fclose($myfile);
?>