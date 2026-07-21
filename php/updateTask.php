<?php

//yhteys tietokantaan
require "db.php";

//kirjekuori, joka vastaanottaa JSON:n
$input = file_get_contents("php://input");

//muutetaan JSON PHP-taulukoksi
$data = json_decode($input, true);

header("Content-Type: application/json"); //PHP kertoo tällä selaimelle, että sen vastaus on JSON-muodossa

//otetaan arvot talteen muuttujiin
$title = $data["title"];
$description = $data["description"];
$recurrence = $data["recurrence"];
$startDate = $data["startDate"];
$endDate = $data["endDate"];
$taskID = $data["taskID"];

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
        //map päiviä varten
        $dayMap = [
            "ma" => 1,
            "ti" => 2,
            "ke" => 3,
            "to" => 4,
            "pe" => 5,
            "la" => 6,
            "su" => 0
        ];

        $stmtInsert = $pdo->prepare($sqlInsert);

        //käydään päivät läpi
        foreach ($data["days"] as $day) {
            $weekday = $dayMap[$day];

            $stmtInsert->execute([
                $taskID,
                $weekday
            ]);
        }
    }

    echo json_encode([ //onnistumisviesti, jos execute() onnistuu
        "success" => true,
        "message" => "Tehtävä päivitettiin onnistuneesti"
    ]);
} catch (PDOException $e) { //jos epäonnistuu, kerrotaan mikä meni pieleen
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
