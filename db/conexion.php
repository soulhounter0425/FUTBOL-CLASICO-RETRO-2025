<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'retro25'; // nombre exacto de tu base en phpMyAdmin

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}
?>
