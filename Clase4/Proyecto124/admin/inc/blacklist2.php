<?php
$myfile = fopen('db/blacklist.txt','r');

while(!feof($myfile)) {
    if(substr_replace(fgets($myfile) ,"", -1) == strval($_SERVER['REMOTE_ADDR'])){
        die("acceso denegado");
    }
}
?>