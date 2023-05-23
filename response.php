<?php

// importing the index.php
include('index.php');

$mysqli_object = $mysqli->query("SELECT * FROM InfoData
ORDER BY api_fetchdate DESC LIMIT 1");


echo json_encode($mysqli_object->fetch_assoc());

?>