<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
    // Recogemos los datos enviados desde el formulario
    $nombre = $_POST["name"];    // 'name' corresponde al nombre del input
    $correo = $_POST["email"];   // 'email' corresponde al nombre del input
    $contrasenya = $_POST["password"];  // 'password' corresponde al nombre del input

    error_log("Nombre: " . $nombre);
    error_log("Correo: " . $correo);
    error_log("Contraseña: " . $contrasenya);

    // Verificamos que todos los campos estén completos
    if (empty($nombre) || empty($correo) || empty($contrasenya)) {
        echo json_encode(["status" => "error", "message" => "Todos los campos son obligatorios."]);
        exit();
    }

    // Comprobamos si el correo ya está registrado
    $stmt = $conn->prepare("SELECT nombre FROM Usuarios WHERE correo = ?");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "El correo ya está registrado."]);
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();

    // Hasheamos la contraseña
    $hash_contraseña = password_hash($contrasenya, PASSWORD_BCRYPT);

    // Insertamos el nuevo usuario en la base de datos
    $stmt = $conn->prepare("INSERT INTO Usuarios (nombre, correo, contrasenya) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nombre, $correo, $hash_contraseña);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Usuario registrado correctamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al registrar: " . $conn->error]);
    }

    $stmt->close();
    $conn->close();
    // Al final de tu archivo PHP, asegúrate de que siempre devuelvas una respuesta JSON
    header('Content-Type: application/json');
    echo json_encode(["status" => "success", "message" => "Usuario registrado correctamente."]);

}
?>
