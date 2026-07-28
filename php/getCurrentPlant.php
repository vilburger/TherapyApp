<?php

//yhteys tietokantaan
require "db.php";

//kirjekuori, joka vastaanottaa JSON:n
$input = file_get_contents("php://input");

//muutetaan JSON PHP-taulukoksi
$data = json_decode($input, true);



//asetetaan toistaiseksi userID:ksi suoraan 1, mutta myöhemmin on tarve hakea käyttäjä oikeasti
$userID = 1; // TODO: hae myöhemmin kirjautuneelta käyttäjältä

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

//käyttäjällä voi olla vain yksi aktiivinen kasvi, joten käytetään fetch(), joka
//palauttaa vain yhden rivin
$currentPlant = $stmt->fetch(PDO::FETCH_ASSOC);

//jos aktiivista kasvia ei vielä ole
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

header("Content-Type: application/json");

echo json_encode($currentPlant);