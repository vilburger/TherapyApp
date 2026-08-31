<?php 

require "db.php";

header("Content-Type: application/json");

// Käyttäjä on toistaiseksi kiinteästi määritelty
// TODO: Haetaan käyttäjä kirjautuneen käyttäjän perusteella
$userID = 1;

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
