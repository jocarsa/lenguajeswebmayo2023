<?php 
    if(isset($_GET['operacion']) && $_GET['operacion'] == "eliminar"){
        
        $peticion = "
        DELETE 
        FROM ".$_GET['tabla']." 
        WHERE Identificador = ".$_GET['id']."
        ";
        $resultado = mysqli_query($mysqli, $peticion);
        header('Location: ?tabla='.$_GET['tabla']);
    }
    
?>
<h2><?php echo $_GET['tabla'] ?></h2>
<?php 
    if(!isset($_GET['operacion'])){
?>
<a href="?tabla=<?php echo $_GET['tabla']?>&operacion=nuevo"><button id="botonnuevo">Nuevo</button></a>
            <div class="caja">
                <table>
                    <thead>
                        <tr>
                            <?php
                                
                                $peticion = "SHOW COLUMNS FROM ".$_GET['tabla'];
                                $resultado = mysqli_query($mysqli, $peticion);
                                while ($fila = mysqli_fetch_assoc($resultado)) {
                                    echo '<th>'.$fila['Field'].'</th>';
                                }
                            ?>
                            
                            
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            
                            $peticion = "
                                SELECT 
                                * 
                                FROM 
                                ".$_GET['tabla'];
                            $resultado = mysqli_query($mysqli, $peticion);
                            while ($fila = mysqli_fetch_assoc($resultado)) {
                                // Principio de la fila
                                echo '<tr>';
                                // Proceso cada uno de los campos
                                foreach ($fila as $clave => $valor){
                                    echo '<td>'.$valor.'</td>';
                                }
                                // Botones de actualizar y borrar
                                echo '         
                                        <td><a href="?tabla='.$_GET['tabla'].'&operacion=actualizar&id='.$fila['Identificador'].'"><button class="botoneditar">Editar</button></a></td>
                                        <td>
                                        <a href="?tabla='.$_GET['tabla'].'&operacion=eliminar&id='.$fila['Identificador'].'"><button class="botoneliminar">Eliminar</button></a></td>
                                    ';
                                // Final de la fila
                                echo '</tr>';
                            }
                        ?>
                    </tbody>
                </table>
            </div>
<?php
                                   
                                  }else{
        switch($_GET['operacion']){
            case "nuevo":
                echo "Creando un elemento nuevo en: ".$_GET['tabla'];
                $peticion = "SHOW COLUMNS FROM ".$_GET['tabla'];
                echo '<form method="POST" action="?tabla='.$_GET['tabla'].'&operacion=procesanuevo">';
                $resultado = mysqli_query($mysqli, $peticion);
                while ($fila = mysqli_fetch_assoc($resultado)) {     
                    echo '
                    <div class="controlformulario">
                        <p>'.$fila['Field'].'</p>
                        <input type="text" name="'.$fila['Field'].'" placeholder="Nuevo: '.$fila['Field'].'" >
                    </div>'; 
                }
                echo '<input type="submit">
                </form>';
                break;
            case "procesanuevo":
                echo "Registrando un nuevo elemento en la base de datos...";
                $peticionsql = "INSERT INTO ".$_GET['tabla']." VALUES (NULL,";
                foreach ($_POST as $clave => $valor){
                    if($clave != "Identificador"){
                        $peticionsql .= "'".$valor."',";
                    }
                }
                $peticionsql = substr_replace($peticionsql ,"", -1);
                $peticionsql .= ")";
                echo "<br>".$peticionsql;
                $resultado = mysqli_query($mysqli, $peticionsql);
               header('Location: ?tabla='.$_GET['tabla']);
                
                break;
            case "actualizar":
                echo "Actualizando un elemento existente en: ".$_GET['tabla'];
                // Primero cargo los datos el registro que estoy solicitando
                $peticion = "SELECT * FROM ".$_GET['tabla']." WHERE Identificador = ".$_GET['id'];
                $resultado = mysqli_query($mysqli, $peticion);
                $precargado = [];
                while ($fila = mysqli_fetch_assoc($resultado)) {  
                    foreach ($fila as $clave => $valor){
                        $precargado[$clave] = $valor;
                    }
                }
                // Luego vuelvo los registros sobre el fomulario
                $peticion = "SHOW COLUMNS FROM ".$_GET['tabla'];
                echo '<form method="POST" action="?tabla='.$_GET['tabla'].'&operacion=procesaactualizar">';
                $resultado = mysqli_query($mysqli, $peticion);
                while ($fila = mysqli_fetch_assoc($resultado)) { 
                    $intermediario = $precargado[$fila['Field']];
                    echo '
                    <div class="controlformulario">
                        <p>'.$fila['Field'].'</p>
                        <input type="text" name="'.$fila["Field"].'" value="'.$intermediario.'" >
                    </div>'; 
                }
                echo '<input type="submit">
                </form>';
                break;
            case "procesaactualizar":
                echo "Registrando un nuevo elemento en la base de datos...";
                $peticionsql = "UPDATE ".$_GET['tabla']." SET ";
                foreach ($_POST as $clave => $valor){
                    if($clave != "Identificador"){
                        $peticionsql .= $clave."='".$valor."',";
                    }
                }
                $peticionsql = substr_replace($peticionsql ,"", -1);
                $peticionsql .= " WHERE Identificador = ".$_POST['Identificador'];
                echo "<br>".$peticionsql;
                $resultado = mysqli_query($mysqli, $peticionsql);
               header('Location: ?tabla='.$_GET['tabla']);
                
                break;
        }
        
    }