<?php

//yhteys tietokantaan
require "db.php";

//kirjekuori, joka vastaanottaa JSON:n
$input = file_get_contents("php://input");

//muutetaan JSON PHP-taulukoksi
$data = json_decode($input, true);

header("Content-Type: application/json"); //PHP kertoo tällä selaimelle, että sen vastaus on JSON-muodossa

//echo json_encode($data); //PHP lähettää takaisin saman datan, jonka se vastaanotti
echo json_encode([ //onnistumisviesti, jos execute() onnistuu
    "success" => true,
    "message" => "Tehtävä tallennettiin onnistuneesti"
]);

//otetaan arvot talteen muuttujiin
$title = $data["name"];
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
