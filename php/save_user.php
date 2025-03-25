<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $fechaNacimiento = $_POST["fechaNacimiento"];
    $contrasenya = $_POST["contrasenya"];
    $telefono = $_POST["telefono"];

    $stmt = $conn->prepare("SELECT nombre FROM Usuarios WHERE correo = ?");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "Error: El correo ya está registrado.";
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();

    $hash_contraseña = password_hash($contrasenya, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO Usuarios (nombre, correo, fechaNacimiento, contrasenya, telefono) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $nombre, $correo, $fechaNacimiento, $hash_contraseña, $telefono);

    if ($stmt->execute()) {
        echo "Usuario registrado correctamente.";
    } else {
        echo "Error al registrar: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}