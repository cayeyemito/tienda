<?php
$host = "45.13.185.247";
$user = "cayetano";
$password = "coQ%4352q";
$database = "tiendaBBDD";

$conn = new mysqli($host, $user, $password, $database);

if($conn->connect_error){
    die("Error de conexión: " . $conn->connect_error);
}
?>