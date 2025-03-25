<?php
include 'db.php';

header('Content-Type: application/json');
error_reporting(E_ALL); // Añadir para debug
ini_set('display_errors', 1); // Mostrar errores en pantalla

$response = [];

// Verifica que se hayan recibido los parámetros por POST
if (isset($_POST["correo"]) && isset($_POST["contrasenya"])) {
    $correo = $_POST["correo"];
    $password = $_POST["contrasenya"];

    try {
        // Verificar conexión a la base de datos
        if ($conexion->connect_error) {
            throw new Exception("Error de conexión: " . $conexion->connect_error);
        }

        $sql = "SELECT contrasenya FROM usuarios WHERE correo = ?";
        $stmt = $conexion->prepare($sql);
        
        if (!$stmt) {
            throw new Exception("Error en preparación: " . $conexion->error);
        }

        $stmt->bind_param("s", $correo);
        
        if (!$stmt->execute()) {
            throw new Exception("Error en ejecución: " . $stmt->error);
        }
        
        $stmt->bind_result($hash_guardado);
        $stmt->fetch();
        $stmt->close();

        if ($hash_guardado && password_verify($password, $hash_guardado)) {
            $response['status'] = 'success';
            $response['message'] = 'Acceso correcto';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Credenciales inválidas';
        }
    } catch (Exception $e) {
        $response['status'] = 'error';
        $response['message'] = 'Error: ' . $e->getMessage();
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Parámetros faltantes';
}

echo json_encode($response);
$conexion->close();
?>