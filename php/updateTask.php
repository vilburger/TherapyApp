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

$stmt = $pdo->prepare($sql);



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

    echo json_encode([ //onnistumisviesti, jos execute() onnistuu
        "success" => true,
        "message" => "Tehtävä tallennettiin onnistuneesti"
    ]);
} catch (PDOException $e) { //jos epäonnistuu, kerrotaan mikä meni pieleen
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
