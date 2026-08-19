<?php

require_once "db.php"; //miksi once? muissa on pelkkä require

$userID = 1; //kovakoodattu koska tällä hetkellä vain yksi käyttäjä

$sql = "
SELECT userName 
FROM users
WHERE userID = :userID
";

$stmt = $pdo->prepare($sql);
$stmt->execute(["userID" => $userID]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

header("Content-Type: application/json");

echo json_encode($user);