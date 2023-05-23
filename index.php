
<?php 
date_default_timezone_set('Asia/Kathmandu');

// Connceting to the MYSQL database
$mysqli = new mysqli('localhost', 'root', '',);

// Creating database query
$createdatabase = "CREATE DATABASE IF NOT EXISTS weatherdata";

// Creating database
$mysqli->query($createdatabase);

// Selecting Database
$mysqli->select_db('weatherdata');

// Creating table query
$createTable = "CREATE TABLE IF NOT EXISTS InfoData(
    cityName VARCHAR(50) NOT NULL,
    temp FLOAT NOT NULL,
    descriptio VARCHAR(50) NOT NULL,
    pressure FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    speed FLOAT NOT NULL,
    direction FLOAT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    api_fetchdate DATETIME NOT NULL,
    nowDate FLOAT NOT NULL
   )";
// Creating the table (InfoData) inside weatherdata database
$mysqli->query($createTable);

// selecting latest items from weatherapp in interval of 1 HOUR
$latestData = "SELECT * FROM  InfoData 
            WHERE api_fetchdate >= DATE_SUB(NOW(),INTERVAL 1 HOUR )";

// Select the table with latest data if exists
$resultTable = $mysqli->query($latestData);

// var_dump($resultTable);

// Getting the data from the server if the latest InfoData table is empty
if ($resultTable->num_rows ===0) {
    // Converting the whole returned file into string 
    $jsonData = file_get_contents("https://api.openweathermap.org/data/2.5/weather?q=Chester,UK&appid=03aec2b95e0aadd2b03f53ad545bd116&units=metric");
    // Decoding the json string
    $weatherData = json_decode($jsonData);
    
// Storing the city name, temperature and all other weather status with apI fetch date
        $cityName = $weatherData->name;
        $temperature = $weatherData->main->temp;
        $weatherDesc = $weatherData->weather[0]->description;
        $pressure = $weatherData->main->pressure;
        $humidity = $weatherData->main->humidity;
        $windSpeed =$weatherData->wind->speed;
        $windDirection = $weatherData->wind->deg;
        $icon = $weatherData->weather[0]->icon;
        $dt = $weatherData->dt;
        $fetch_date = date('Y-m-d H:i:s');
    

    // Query for inserting the obtained data into table
    
    $insertDatabaseQuery = "INSERT INTO InfoData
    (cityName,temp,descriptio,pressure,humidity,speed,direction,icon, api_fetchdate,nowDate)
    VALUES 
    ('$cityName',$temperature,'$weatherDesc',$pressure,$humidity,$windSpeed,$windDirection,'$icon','$fetch_date',$dt)";
    

    // Inserting the Fetched data into InfoData table
    $mysqli->query($insertDatabaseQuery);
    // var_dump($mysqli->query($insertDatabaseQuery));
    
    }

?>