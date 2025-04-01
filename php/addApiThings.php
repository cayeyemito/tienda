<?php
// Verifica si se recibió la variable 'languages' y decodifica el JSON
if (isset($_POST['languages'])) {
    $languages = json_decode($_POST['languages'], true); // Decodificamos el JSON en un array

    // Conéctate a la base de datos
    include 'db.php';

    // Preparar la declaración para insertar los idiomas en la base de datos
    $stmt = $conn->prepare("INSERT INTO Lenguajes (id, english_name, nameLanguage) VALUES (?, ?, ?)");

    // Iterar sobre cada idioma y agregarlo
    foreach ($languages as $language) {
        $iso = $language['iso'];  // Corregido: Se obtiene de $language, no $languages
        $english_name = $language['english_name'];
        $name = $language['name'];

        $stmt->bind_param("sss", $iso, $english_name, $name);

        if (!$stmt->execute()) {
            echo "Error al insertar el idioma con ISO $iso: " . $stmt->error;
        }
    }

    $stmt->close();
    $conn->close();
    echo "Idiomas agregados correctamente";
} else {
    echo "No se recibieron idiomas.";
}
?>
