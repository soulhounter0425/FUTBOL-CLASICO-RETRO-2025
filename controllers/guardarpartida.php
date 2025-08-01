<?php
session_start();
include '../db/conexion.php';

// Validar que el usuario esté logueado
if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401); // No autorizado
    echo "No hay sesión activa.";
    exit;
}

$usuario_id = $_SESSION['usuario_id'];

// Validar que el puntaje venga por POST
if (!isset($_POST['puntaje'])) {
    http_response_code(400); // Error de solicitud
    echo "Puntaje no recibido.";
    exit;
}

$puntaje = intval($_POST['puntaje']); // Forzar que sea número entero

// Preparar y ejecutar la consulta segura
$sql = "INSERT INTO partidas (usuario_id, puntaje, fecha) VALUES (?, ?, NOW())";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("ii", $usuario_id, $puntaje);
    $stmt->execute();
    echo "Puntaje guardado correctamente.";
} else {
    http_response_code(500); // Error interno del servidor
    echo "Error al preparar la consulta.";
}
?>

