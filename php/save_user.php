<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Verificar la conexión a la base de datos
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Recogemos los datos enviados desde el formulario
    $nombre = $_POST["nombre"];    // 'nombre' corresponde al nombre del campo en JS
    $correo = $_POST["email"];     // 'email' corresponde al nombre del campo en JS
    $contrasenya = $_POST["password"];  // 'password' corresponde al nombre del campo en JS

    // Comprobamos si el correo ya está registrado
    $stmt = $conn->prepare("SELECT nombre FROM Usuarios WHERE correo = ?");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "El correo ya esta registrado."]);
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
        header('Content-Type: application/json');
        echo json_encode(["status" => "success", "message" => "Usuario registrado correctamente."]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["status" => "error", "message" => "Error al registrar: " . $conn->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
