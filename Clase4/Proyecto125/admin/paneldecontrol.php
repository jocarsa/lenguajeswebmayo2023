<?php
    session_start();
    //include "inc/blacklist2.php";
    if(!isset($_SESSION['llave'])){die("Te has intentado colar");}
    include "inc/config.php";
    //include "inc/registro.php";
?>
<!doctype html>
<html lang="es">
    <head>
        <title>Panel de control</title>
        <meta charset="utf-8">
        <link rel="Stylesheet" href="estilo/paneldecontrol.css">
    </head>
    <body>
        <header>
            <img src="img/logo.png" id="logo">
            <h1>Panel de control</h1>
        </header>
        <nav>
            <ul>
                <?php
                    include "inc/menudinamico.php";
                ?>
            </ul>
        </nav>
        <section>
            <?php
                    include "inc/mostrarTabla.php";
                ?>
        </section>
    </body>
</html>
