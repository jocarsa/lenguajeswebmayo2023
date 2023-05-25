<?php

// Bloqueo por ataque
foreach($_REQUEST as $variable=>$valor){ 
    if(preg_match_all('/\b(SELECT|INSERT|DELETE|UPDATE|;|DROP|ORDER|HAVING|<scri)\b/i',$valor)){
	$myfile = fopen("../db/blacklist.txt", "a") or die("Unable to open file!");
    $txt = $_SERVER['REMOTE_ADDR']."\n";
    fwrite($myfile, $txt);
    fclose($myfile);
	die('{"mensaje":"intento de ataque detectado"}');
    }
}