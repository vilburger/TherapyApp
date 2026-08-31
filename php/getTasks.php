<?php

require "db.php";

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
    TASKDAY.weekday,
    TASKCOMPLETION.completedAt
FROM TASK

LEFT JOIN TASKDAY
ON TASK.taskID = TASKDAY.taskID

LEFT JOIN TASKCOMPLETION
ON TASK.taskID = TASKCOMPLETION.taskID
";

$stmt = $pdo->prepare($sql);

$stmt->execute();

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$tasks = [];

// Muuttaa tietokannan viikonpäivän numeron JavaScriptin käyttämäksi tunnukseksi
$dayMap = [
    1 => "ma",
    2 => "ti",
    3 => "ke",
    4 => "to",
    5 => "pe",
    6 => "la",
    0 => "su"
];

// Kootaan JOIN-kyseyn useat rivit yhdeksi tehtäväksi ja sen viikonpäiviksi ja suorituksiksi
foreach ($rows as $row) {
    $taskID = $row["taskID"];

    // Ryhmitellään kyselyn tulokset taskID:n perusteella
    if (!isset($tasks[$taskID])) {
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
        $tasks[$taskID]["days"][] = $dayMap[(int)$row["weekday"]];
    }

    if ($row["completedAt"] !== null) {
        $date = new DateTime($row["completedAt"]);

        // Käytetään samaa viikonpäivien numerointia kuin JavaScriptin getDay() -metodissa
        $weekday = $date->format("w");

        $tasks[$taskID]["completedDays"][] = (int)$weekday;
    }
}

header("Content-Type: application/json");

echo json_encode(array_values($tasks));