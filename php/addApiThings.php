<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $id = $_POST["id"];

    $stmt = $conn->prepare("INSERT INTO Generos (id, nombre) VALUES (?, ?)");
    $stmt->bind_param("is", $id, $nombre);

    if ($stmt->execute()) {
        echo "Generos agregados.";
    } else {
        echo "Error al registrar: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}