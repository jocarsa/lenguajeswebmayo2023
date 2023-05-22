<?php
    $myfile = fopen("mensajes.txt", "a") or die("Unable to open file!");
        fwrite($myfile, $_POST['mensaje']."\n");
        fclose($myfile);
?>