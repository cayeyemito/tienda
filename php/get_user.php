<?php
include 'db.php';

if (isset($_GET["correo"])) {
    $correo = $_GET["correo"];

    // Preparar la consulta segura
    $stmt = $conn->prepare("SELECT contrasenya FROM Usuarios WHERE correo = ?");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode(["contrasenya" => $row["contrasenya"]]);
    } else {
        echo json_encode(["error" => "Usuario no encontrado"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Correo no proporcionado"]);
}

$conn->close();
?>