<?php

require "db.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

header("Content-Type: application/json");

$plantID = $data["plantID"];

// Käyttäjä-ID on toistaiseksi kovakoodattu, koska sovelluksessa ei ole käyttäjätunnistusta.
// TODO: Hae käyttäjä kirjautuneen käyttäjän perusteella.
$userID = 1;

$sqlUpdatePlant = "
UPDATE CURRENTPLANT
SET plantID = ?, progress = 0
WHERE userID = ?
";

try {
    $stmtUpdatePlant = $pdo->prepare($sqlUpdatePlant);

    $stmtUpdatePlant->execute([
        $plantID,
        $userID
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