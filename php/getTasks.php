<?php

require "db.php"; //tietokantayhteys

//SQL-lause jokaa hakee kaiken TASK-taulun sisällön
$sql = "
SELECT * FROM TASK
";

//valmistellaan sql
$stmt = $pdo->prepare($sql);

//suoritus
$stmt->execute();

//luetaan kaikki rivit ja tallennetaan ne muuttujaan rows
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

//kertoo selaimelle että lähetetään jsonia
header("Content-Type: application/json");

//muuttaa PHP taulukon JSONiksi
echo json_encode($tasks);

$tasks = [];

//käydäään läpi tietokannan palauttamat rivit
foreach ($rows as $row) {
    //otetaan taskID talteen
    $taskID = $row["taskID"];

    //jokaisen taskID:n kohdalla tarkistetaan onko sillä ID:llä jo task (luodaanko uusi vai lisätäänkö pvm arvo vanhaan)
    if (!isset($tasks[$taskID])) {

    }
}