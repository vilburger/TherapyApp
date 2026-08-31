<?php

require "db.php";

// Käyttäjä-ID on toistaiseksi kovakoodattu, koska sovelluksessa on yksi käyttäjä.
// TODO: Hae käyttäjä kirjautuneen käyttäjän perusteella.
$userID = 1;

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