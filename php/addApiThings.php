<?php
if (isset($_POST['companies'])) {
    $companies = json_decode($_POST['companies'], true);

    include 'db.php';

    // Preparar consultas
    $stmt_select = $conn->prepare("SELECT id FROM companyia WHERE nombre = ?");
    $stmt_parent = $conn->prepare("SELECT id FROM companyia WHERE nombre = ?");
    $stmt_update = $conn->prepare("UPDATE companyia SET parent_company = ? WHERE id = ?");
    $stmt_insert = $conn->prepare("INSERT INTO companyia (descripcion, sede, nombre, origin_country, parent_company) VALUES (?, ?, ?, ?, ?)");

    foreach ($companies as $companie) {
        $name = $companie['name'];

        // Buscar si la compañía ya existe
        $company_id = null;
        $stmt_select->bind_param("s", $name);
        $stmt_select->execute();
        $stmt_select->bind_result($company_id);
        $stmt_select->fetch();
        $stmt_select->reset();

        // Buscar la ID del parent_company si tiene uno
        $parent_id = null;
        if (!empty($companie['parent_company'])) {
            $stmt_parent->bind_param("s", $companie['parent_company']);
            $stmt_parent->execute();
            $stmt_parent->bind_result($parent_id);
            $stmt_parent->fetch();
            $stmt_parent->reset();
        }

        if ($company_id) {
            // Si la compañía ya existe, actualizar su parent_company
            if ($parent_id) {
                $stmt_update->bind_param("ii", $parent_id, $company_id);
                if ($stmt_update->execute()) {
                    echo "Compañía '$name' actualizada con parent_company ID: $parent_id\n";
                } else {
                    echo "Error al actualizar '$name': " . $stmt_update->error . "\n";
                }
            } else {
                echo "No se encontró parent_company para '$name', dejando el valor actual.\n";
            }
        } else {
            // Si la compañía no existe, insertarla con el parent_company (si existe)
            $stmt_insert->bind_param(
                "sssss",
                $companie['description'],
                $companie['headquarters'],
                $companie['name'],
                $companie['origin_country'],
                $parent_id
            );

            if ($stmt_insert->execute()) {
                echo "Compañía '$name' insertada correctamente.\n";
            } else {
                echo "Error al insertar '$name': " . $stmt_insert->error . "\n";
            }
        }
    }

    // Cerrar las conexiones
    $stmt_select->close();
    $stmt_parent->close();
    $stmt_update->close();
    $stmt_insert->close();
    $conn->close();

    echo "Proceso completado.\n";
} else {
    echo "No se recibieron compañías.";
}
?>
