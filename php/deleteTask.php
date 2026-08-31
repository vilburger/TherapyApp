<?php

require "db.php";

$input = file_get_contents("php://input");

$data = json_decode($input, true);

header("Content-Type: application/json");

$taskID = $data["taskID"];

$sql = "
DELETE FROM TASK
WHERE taskID = ?
";

$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([
        $taskID
    ]);

    echo json_encode([ 
        "success" => true,
        "message" => "Tehtävä poistettiin onnistuneesti"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
