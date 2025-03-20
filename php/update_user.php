<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $userId = $_POST["id"];

    $stmt = $conn->prepare("UPDATE Usuarios SET nombre = ?, correo = ? WHERE id = ?");
    $stmt->bind_param("ssi", $nombre, $correo, $userId);

    if ($stmt->execute()) {
        echo "Usuario editado correctamente.";
    } else {
        echo "Error al editar: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}