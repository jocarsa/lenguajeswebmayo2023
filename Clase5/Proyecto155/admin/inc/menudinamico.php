<?php
    
    $peticion = "SHOW TABLES";
    $resultado = mysqli_query($mysqli, $peticion);
    while ($fila = mysqli_fetch_assoc($resultado)) {
        /*
        echo '
        <li>
            <a href="?tabla='.$fila['Tables_in_dbs11010497'].'">
                <span class="icono">'.$fila['Tables_in_dbs11010497'][0].'</span>
                '.$fila['Tables_in_dbs11010497'].'
            </a>
        </li>
        ';
        */
        echo '
        <li>
            <a href="?tabla='.$fila['Tables_in_ideaoniric'].'">
                <span class="icono">'.$fila['Tables_in_ideaoniric'][0].'</span>
                '.$fila['Tables_in_ideaoniric'].'
            </a>
        </li>
        ';
    }
?>