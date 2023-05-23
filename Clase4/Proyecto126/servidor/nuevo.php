<?php
    $myfile = fopen("entradas.txt", "a") or die("Unable to open file!");
        fwrite($myfile, $_POST['mensaje']."\n");
        fclose($myfile);
?>