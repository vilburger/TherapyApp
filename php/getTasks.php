<?php

require "db.php"; //tietokantayhteys

//SQL-lause jokaa hakee TASK-taulun sisällön, ja TASKDAY-taulun weekday sisällön. Taulut yhdistetään LEFT JOINilla 
//yhdistyen taskID:llä.
$sql = "
SELECT
    TASK.taskID,
    TASK.userID,
    TASK.title,
    TASK.description,
    TASK.recurrence,
    TASK.startDate,
    TASK.endDate,
    TASK.rewardPoints,
    TASKDAY.weekday
FROM TASK
LEFT JOIN TASKDAY
ON TASK.taskID = TASKDAY.taskID
";

//valmistellaan sql
$stmt = $pdo->prepare($sql);

//suoritus
$stmt->execute();

//luetaan kaikki rivit ja tallennetaan ne muuttujaan rows
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$tasks = [];

//lista päivistä, jotta ne saadaan muutettua takaisin merkkijonoksi JavaScriptiä varten
//JS toiminta perustuu merkkijonoihin, joten nopeampi lisätä tänne lista kuin muuttaa joka kohtaa vastaamaan numeroarvoja
$dayMap = [
    1 => "ma",
    2 => "ti",
    3 => "ke",
    4 => "to",
    5 => "pe",
    6 => "la",
    0 => "su"
];

//käydäään läpi tietokannan palauttamat rivit
foreach ($rows as $row) {
    //otetaan taskID talteen
    $taskID = $row["taskID"];

    //jokaisen taskID:n kohdalla tarkistetaan onko sillä ID:llä jo task (luodaanko uusi vai lisätäänkö pvm arvo vanhaan)
    if (!isset($tasks[$taskID])) {
        //luodaan tehtävä
        $tasks[$taskID] = [
            "taskID" => $row["taskID"],
            "userID" => $row["userID"],
            "title" => $row["title"],
            "description" => $row["description"],
            "recurrence" => $row["recurrence"],
            "startDate" => $row["startDate"],
            "endDate" => $row["endDate"],
            "rewardPoints" => $row["rewardPoints"],
            "days" => [],
            "completedDays" => []
        ];
    }
    if ($row["weekday"] !== null) {
        //$tasks[$taskID] = haetaan oikea tehtävä
        //["days"] = haetaan sen days-taulukko
        //[] = lisätään uusi alkio taulukon loppuun
        //(int) = muutetaan weekday kokonaisluvuksi
        $tasks[$taskID]["days"][] = $dayMap[(int)$row["weekday"]];
    }
}

//kertoo selaimelle että lähetetään jsonia
header("Content-Type: application/json");

//muuttaa PHP taulukon JSONiksi
echo json_encode(array_values($tasks));
