<?php
session_start();
include '../db/conexion.php';

$usuario_id = $_SESSION['usuario_id'];
$partida_id = $_POST['id'];

$sql = "DELETE FROM partidas WHERE id = ? AND usuario_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $partida_id, $usuario_id);
$stmt->execute();

echo "Partida eliminada.";
?>
