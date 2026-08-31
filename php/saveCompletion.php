<?php

require "db.php";

$input = file_get_contents("php://input");

$data = json_decode($input, true);

header("Content-Type: application/json");

$taskID = $data["taskID"];
$completedAt = $data["completedAt"];

// Tallentaa tehtävän suorituksen
$sql = "
INSERT INTO TASKCOMPLETION
(taskID, completedAt)
VALUES
(?, ?)
";

// Tarkistaa onko tehtävä jo merkitty tehdyksi samana päivänä
$sqlCheck = "
SELECT COUNT(*)
FROM TASKCOMPLETION
WHERE taskID = ?
AND completedAt = ?
";

// Haetaan tehtävään liittyvä käyttäjä, jotta suoritus voidaan yhdistää hänen aktiiviseen kasviinsa
$sqlGetUser = "
SELECT userID
FROM TASK
WHERE taskID = ?
";

// Kasvattaa aktiivisen kasvin edistymistä yhdellä.
// Edistymistä kasvatetaan vain, jos kasvi ei ole vielä saavuttanut vaadittua suoritusmäärää.
$sqlUpdateProgress = "
UPDATE CURRENTPLANT
JOIN PLANT
    ON CURRENTPLANT.plantID = PLANT.plantID
SET CURRENTPLANT.progress = CURRENTPLANT.progress + 1
WHERE CURRENTPLANT.userID = ?
AND CURRENTPLANT.progress < PLANT.requiredCompletions
";

// Lisää valmiin kasvin puutarhaan tai kasvattaa olemassa olevan kasvin määrää
$sqlAddToGarden = "
INSERT INTO GARDEN (plantID, userID, amount)
VALUES (?, ?, 1)
ON DUPLICATE KEY UPDATE
amount = amount + 1
";

// Haetaan kasvin tämänhetkinen edistyminen ja tarvittavien suoritusten määrä
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

        // Haetaan tehtävän käyttäjä, jotta oikean käyttäjän aktiivista kasvia voidaan päivittää
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

        // Kun kasvi saavuttaa vaaditun suoritusmäärän, se lisätään käyttäjän puutarhaan
        if ($plantProgress["progress"] >= $plantProgress["requiredCompletions"]) {
            $stmtAddToGarden->execute([
                $plantProgress["plantID"],
                $userID
            ]);
        }

        echo json_encode([
            "success" => true,
            "newCompletion" => true,
            "message" => "Suoritus tallennettiin"
        ]);
    } else {
        echo json_encode([ 
            "success" => true,
            "newCompletion" => false,
            "message" => "Tehtävä oli jo merkitty tehdyksi"
        ]);
    }
} catch (PDOException $e) { 
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
