<?php
include 'db.php';

header('Content-Type: application/json');
error_reporting(E_ALL); // Para mostrar todos los errores
ini_set('display_errors', 1); // Mostrar errores en pantalla

// Inicializamos la respuesta
$response = [];

// Verifica que se hayan recibido los parámetros por POST
if (isset($_POST["email"]) && isset($_POST["password"])) {

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $correo = $_POST["email"];
    $contrasenya = $_POST["password"];

    $stmt = $conn->prepare("SELECT contrasenya, nombre FROM Usuarios WHERE correo = ?");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($contrasenya_guardada, $nombre);
        $stmt->fetch();

        if(password_verify($contrasenya, $contrasenya_guardada)){
            $response = [
                "status" => "success",
                "message" => "Inicio de sesión exitoso.",
                "usuario" => [
                    "nombre" => $nombre
                ]
            ];
        } else {
            $response = [
                "status" => "error",
                "message" => "Contraseña incorrecta."
            ];
        }
    } else {
        $response = [
            "status" => "error",
            "message" => "El usuario no existe."
        ];
    }
}

// Cerramos la declaración y la conexión
$stmt->close();
$conn->close();

// Enviamos la respuesta en formato JSON
echo json_encode($response);
exit();
?>