<?php

require "db.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

header("Content-Type: application/json"); 

$title = $data["title"];
$description = $data["description"];
$recurrence = $data["recurrence"];
$startDate = $data["startDate"];
$endDate = $data["endDate"];

// Käyttäjä-ID on toistaiseksi kovakoodattu, koska sovelluksessa on yksi käyttäjä.
// TODO: Hae käyttäjä kirjautuneen käyttäjän perusteella.
$userID = 1;

// Muuntaa JavaScriptin käyttämät viikonpäivien tunnukset tietokannan numeroiksi
$dayMap = [
    "ma" => 1,
    "ti" => 2,
    "ke" => 3,
    "to" => 4,
    "pe" => 5,
    "la" => 6,
    "su" => 0
];

$sqlTask = "
INSERT INTO TASK 
(userID, title, description, recurrence, startDate, endDate)
VALUES
(?, ?, ?, ?, ?, ?)
";

$sqlTaskDay = "
INSERT INTO TASKDAY
(taskID, weekday)
VALUES
(?, ?)
";

try {
    $pdo->beginTransaction();

    // Tallennetaan uusi tehtävä
    $stmtTask = $pdo->prepare($sqlTask);

    $stmtTask->execute([
        $userID,
        $title,
        $description,
        $recurrence,
        $startDate,
        $endDate
    ]);

    $taskID = $pdo->lastInsertId();

    // Tallennetaan tehtävälle valitut viikonpäivät
    $stmtTaskDay = $pdo->prepare($sqlTaskDay);

    foreach ($data["days"] as $day) {
        $weekday = $dayMap[$day];

        $stmtTaskDay->execute([
            $taskID,
            $weekday
        ]);
    }

    $pdo->commit();

    echo json_encode([ 
        "success" => true,
        "message" => "Tehtävä tallennettiin onnistuneesti"
    ]);

} catch (PDOException $e) { 
    $pdo->rollBack();

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}