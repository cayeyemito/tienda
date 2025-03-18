<?php
include 'db.php';

$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

if (!$result) {
    die('Query failed: ' . $conn->error);
}

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);

$conn->close();
?>