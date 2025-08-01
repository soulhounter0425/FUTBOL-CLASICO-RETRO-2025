<?php
include 'conexion.php';

$sql = "INSERT INTO goles (equipo, jugador, minuto) VALUES ('Brasil', 'Ronaldo', 12)";
if ($conexion->query($sql) === TRUE) {
    echo "Gol insertado con éxito!";
} else {
    echo "Error: " . $conexion->error;
}
?>
