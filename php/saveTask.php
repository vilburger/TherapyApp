<?php

//yhteys tietokantaan
require "db.php";

//kirjekuori, joka vastaanottaa JSON:n
$input = file_get_contents("php://input");

//muutetaan JSON PHP-taulukoksi
$data = json_decode($input, true);

header("Content-Type: application/json"); //PHP kertoo tällä selaimelle, että sen vastaus on JSON-muodossa

//echo json_encode($data); //PHP lähettää takaisin saman datan, jonka se vastaanotti


//otetaan arvot talteen muuttujiin
$title = $data["title"];
$description = $data["description"];
$recurrence = $data["recurrence"];
$startDate = $data["startDate"];
$endDate = $data["endDate"];
$userID = 1; //testausta varten vain

//lisätään uusi rivi TASK-tauluun. 
//Arvoja lisätään rivin 27 ilmoittamiin sarakkeisiin.
//Kysymysmerkit ovat tyhjiä laatikoita arvoille, jotka saadaan execute-vaiheessa
$sql = "
INSERT INTO TASK 
(userID, title, description, recurrence, startDate, endDate)
VALUES
(?, ?, ?, ?, ?, ?)
";

try { //virheenkäsittely -  jos onnistuu, lähetetään success
    //pdo = tietokantayhteys, joka luotiin db.php:ssä
    //-> = käytä tämän olion toimintoa
    //prepare = lähettää ylläolevan SQL-lauseen tietokannalle valmisteltavaksi
    //stmt = prepare palauttaa olion, jota kutsutaan nimellä statement
    $stmt = $pdo->prepare($sql);

    //Executella tietokanta saa oikeat arvot. Kysymysmerkit täytetään järjestyksessä näillä arvoilla.
    $stmt->execute([
        $userID,
        $title,
        $description,
        $recurrence,
        $startDate,
        $endDate
    ]);

    $taskID = $pdo->lastInsertId();

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

$sqlTaskDay = "
INSERT INTO TASKDAY
(taskID, weekday)
VALUES
(?, ?)
";

//tehdään SQL-valmistelu kerran ennen silmukkaa, ettei tarvitse jokaisella silmukan kierroksella
$stmtTaskDay = $pdo->prepare($sqlTaskDay);

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

//käydään päivät läpi
foreach ($data["days"] as $day) {
    $weekday = $dayMap[$day];

    //tallennus (suoritetaan ylempänä oleva SQL INSERT INTO...)
    $stmtTaskDay->execute([
        $taskID,
        $weekday
    ]);
}
