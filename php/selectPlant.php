<?php

require "db.php";

$input = file_get_contents("php://input");

$data = json_decode($input, true);

header("Content-Type: application/json");

$plantID = $data["plantID"];

//koska sovelluksessa ei käyttäjän tunnistusta, asetetaan userID suoraan 1
$sqlUpdatePlant = "
UPDATE CURRENTPLANT
SET plantID = ?, progress = 0
WHERE userID = 1
";

$stmtUpdatePlant = $pdo->prepare($sqlUpdatePlant);

try {
    $stmtUpdatePlant->execute([
        $plantID
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Kasvi valittiin"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}