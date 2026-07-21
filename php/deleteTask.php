<?php

//yhteys tietokantaan
require "db.php";

//kirjekuori, joka vastaanottaa JSON:n
$input = file_get_contents("php://input");

//muutetaan JSON PHP-taulukoksi
$data = json_decode($input, true);

header("Content-Type: application/json"); //PHP kertoo tällä selaimelle, että sen vastaus on JSON-muodossa

$taskID = $data["taskID"];

$sql = "
DELETE FROM TASK
WHERE taskID = ?
";

$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([
        $taskID
    ]);

    echo json_encode([ //onnistumisviesti, jos execute() onnistuu
        "success" => true,
        "message" => "Tehtävä poistettiin onnistuneesti"
    ]);
} catch (PDOException $e) { //jos epäonnistuu, kerrotaan mikä meni pieleen
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
