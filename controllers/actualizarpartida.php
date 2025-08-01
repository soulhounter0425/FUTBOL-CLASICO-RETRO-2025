<?php
session_start();
include '../db/conexion.php';

$usuario_id = $_SESSION['usuario_id'];
$partida_id = $_POST['id'];
$puntaje_nuevo = $_POST['puntaje'];

$sql = "UPDATE partidas SET puntaje = ? WHERE id = ? AND usuario_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iii", $puntaje_nuevo, $partida_id, $usuario_id);
$stmt->execute();

echo "Puntaje actualizado.";
?>
