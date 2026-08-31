<?php

require "db.php";

header("Content-Type: application/json");

$sql = "
SELECT
    plantID,
    plantName,
    requiredCompletions,
    imageFolder
FROM PLANT
";

$stmt = $pdo->prepare($sql);

try {
    $stmt->execute();

    $plants = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($plants);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}