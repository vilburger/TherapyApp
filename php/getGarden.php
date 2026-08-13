<?php 

require "db.php";

//asetetaan toistaiseksi userID:ksi suoraan 1, mutta myöhemmin on tarve hakea käyttäjä oikeasti
$userID = 1; // TODO: hae myöhemmin kirjautuneelta käyttäjältä

$sql = "
SELECT
    GARDEN.plantID,
    GARDEN.amount,
    PLANT.plantName,
    PLANT.imageFolder
FROM GARDEN
JOIN PLANT
    ON GARDEN.plantID = PLANT.plantID
WHERE GARDEN.userID = ?
";

$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([$userID]);

    $plants = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($plants);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
