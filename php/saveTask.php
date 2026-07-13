<?php

//yhteys tietokantaan
require "db.php";

//kirjekuori, joka vastaanottaa JSON:n
$input = file_get_contents("php://input");

//muutetaan JSON PHP-taulukoksi
$data = json_decode($input, true);

header("Content-Type: application/json"); //PHP kertoo tällä selaimelle, että sen vastaus on JSON-muodossa

echo json_encode($data); //PHP lähettää takaisin saman datan, jonka se vastaanotti
