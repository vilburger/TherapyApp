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

$stmt = $pdo->prepare($sql);
$stmtCheck = $pdo->prepare($sqlCheck);

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

        echo json_encode([ //onnistumisviesti, jos execute() onnistuu
            "success" => true,
            "message" => "Suoritus tallennettiin"
        ]);
    } else {
        echo json_encode([ //onnistumisviesti, jos execute() onnistuu
            "success" => true,
            "message" => "Tehtävä oli jo merkitty tehdyksi"
        ]);
    }
} catch (PDOException $e) { //jos epäonnistuu, kerrotaan mikä meni pieleen
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
