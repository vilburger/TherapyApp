<?php

//yhteys tietokantaan
require "db.php";

//kirjekuori, joka vastaanottaa JSON:n
$input = file_get_contents("php://input");

//muutetaan JSON PHP-taulukoksi
$data = json_decode($input, true);

header("Content-Type: application/json"); //PHP kertoo tällä selaimelle, että sen vastaus on JSON-muodossa

$taskID = $data["taskID"];
$completedAt = $data["completedAt"];

$sql = "
INSERT INTO TASKCOMPLETION
(taskID, completedAt)
VALUES
(?, ?)
";

$sqlCheck = "
SELECT COUNT(*)
FROM TASKCOMPLETION
WHERE taskID = ?
AND completedAt = ?
";

$sqlGetUser = "
SELECT userID
FROM TASK
WHERE taskID = ?
";

$sqlUpdateProgress = "
UPDATE CURRENTPLANT
JOIN PLANT
    ON CURRENTPLANT.plantID = PLANT.plantID
SET CURRENTPLANT.progress = CURRENTPLANT.progress + 1
WHERE CURRENTPLANT.userID = ?
AND CURRENTPLANT.progress < PLANT.requiredCompletions
";

$sqlAddToGarden = "
INSERT INTO GARDEN (plantID, userID, amount)
VALUES (?, ?, 1)
ON DUPLICATE KEY UPDATE
amount = amount + 1
";

$sqlGetPlantProgress = "
SELECT
    CURRENTPLANT.plantID,
    CURRENTPLANT.progress,
    PLANT.requiredCompletions
FROM CURRENTPLANT
JOIN PLANT
    ON CURRENTPLANT.plantID = PLANT.plantID
WHERE CURRENTPLANT.userID = ?
";

$stmt = $pdo->prepare($sql);
$stmtCheck = $pdo->prepare($sqlCheck);
$stmtGetUser = $pdo->prepare($sqlGetUser);
$stmtUpdateProgress = $pdo->prepare($sqlUpdateProgress);
$stmtAddToGarden = $pdo->prepare($sqlAddToGarden);
$stmtGetPlantProgress = $pdo->prepare($sqlGetPlantProgress);

try {
    $stmtCheck->execute([
        $taskID,
        $completedAt
    ]);

    $count = $stmtCheck->fetchColumn();

    if ($count == 0) {
        $stmt->execute([
            $taskID,
            $completedAt
        ]);

        $stmtGetUser->execute([
            $taskID
        ]);

        $userID = $stmtGetUser->fetchColumn();

        $stmtUpdateProgress->execute([
            $userID 
        ]);

        $stmtGetPlantProgress->execute([
            $userID
        ]);

        $plantProgress = $stmtGetPlantProgress->fetch(PDO::FETCH_ASSOC);

        if ($plantProgress["progress"] >= $plantProgress["requiredCompletions"]) {
            $stmtAddToGarden->execute([
                $plantProgress["plantID"],
                $userID
            ]);
        }

        echo json_encode([ //onnistumisviesti, jos execute() onnistuu
            "success" => true,
            "newCompletion" => true,
            "message" => "Suoritus tallennettiin"
        ]);
    } else {
        echo json_encode([ //onnistumisviesti, jos execute() onnistuu
            "success" => true,
            "newCompletion" => false,
            "message" => "Tehtävä oli jo merkitty tehdyksi"
        ]);
    }
} catch (PDOException $e) { //jos epäonnistuu, kerrotaan mikä meni pieleen
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
