<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"]
    $correo = $_POST["correo"]

    $stmt = $conn-›prepare("INSERT INTO usuarios (nombre, correo) VALUES (P, ?)"):
    $stmt-›bind_param("ss", $nombre, $correo);

    if ($stmt-›execute()) {
        echo "Usuario registrado correctamente.";
    } else {
        echo "Error al registrar: " . $conn-›error;  
    }

    $stmt->close():
    $conn-›close():
}