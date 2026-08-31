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
$taskID = $data["taskID"];

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

$sql = "
UPDATE TASK
SET title = ?,
    description = ?,
    recurrence = ?,
    startDate = ?,
    endDate = ?
WHERE taskID = ?
";

$sqlDelete = "
DELETE FROM TASKDAY
WHERE taskID = ?
";

$sqlInsert = "
INSERT INTO TASKDAY
(taskID, weekday)
VALUES
(?, ?)
";

try {
    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        $title,
        $description,
        $recurrence,
        $startDate,
        $endDate,
        $taskID
    ]);

    $stmtDelete = $pdo->prepare($sqlDelete);

    $stmtDelete->execute([
        $taskID
    ]);

    if ($recurrence === "custom") {
        $stmtInsert = $pdo->prepare($sqlInsert);

        foreach ($data["days"] as $day) {
            $weekday = $dayMap[$day];

            $stmtInsert->execute([
                $taskID,
                $weekday
            ]);
        }
    }

    echo json_encode([ 
        "success" => true,
        "message" => "Tehtävä päivitettiin onnistuneesti"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}