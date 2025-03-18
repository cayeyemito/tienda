<?php
include 'db.php';

if ($_SERVER["Request_Method"]=="Post"){
    $nombre=$_POST["nombre"];
    $correo=$_POST["correo"];

    $stmt $conn->prepare("INSERT INTO usuarios (nombre, correo) VALUES (?, ?)"); 
    $stmt->bind_param("ss", $nombre, $correo); 

    if ($stmt->execute()) { 
        echo "Usuario registrado correctamente."; 
    } else { 
    echo "Error al registrar": . $conn->error; 
    } 
    
    $stmt->close(); 
    $conn->close();

}


?>