<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id"])) {
    $userID = $_POST["id"];

    $stmt = $conn->prepare("DELETE FROM Usuarios WHERE id = ?");
    $stmt->bind_param("i", $userID);

    if ($stmt->execute()) {
        echo "Usuario eliminado correctamente.";
    } else {
        echo "Error al eliminar: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>