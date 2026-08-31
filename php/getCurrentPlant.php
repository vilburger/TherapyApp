<?php

require "db.php";

header("Content-Type: application/json");

// Käyttäjä on toistaiseksi kiinteästi määritelty
// TODO: Haetaan käyttäjä kirjautuneen käyttäjän perusteella
$userID = 1; 

$sql = "
SELECT
    PLANT.plantID,
    PLANT.plantName,
    PLANT.requiredCompletions,
    PLANT.imageFolder,
    CURRENTPLANT.progress
FROM CURRENTPLANT

JOIN PLANT
ON CURRENTPLANT.plantID =  PLANT.plantID

WHERE CURRENTPLANT.userID = ?
";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    $userID
]);

// Käyttäjällä voi olla vain yksi aktiivinen kasvi, joten haetaan vain yksi rivi
$currentPlant = $stmt->fetch(PDO::FETCH_ASSOC);

// Jos käyttäjällä ei vielä ole aktiivista kasvia, luodaan oletuskasvi
if ($currentPlant === false) {
    $sqlInsert = "
    INSERT INTO CURRENTPLANT
    (userID, plantID, progress)
    VALUES
    (?, ?, ?)
    ";

    $stmtInsert = $pdo->prepare($sqlInsert);

    $stmtInsert->execute([
        $userID,
        1,
        0
    ]);

    $stmt->execute([$userID]);

    $currentPlant = $stmt->fetch(PDO::FETCH_ASSOC);
}

echo json_encode($currentPlant);