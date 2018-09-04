<?php
include("receive.php");

$conn = new mysqli("db", "root", "password", "db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT * FROM score";
$res = $conn->query($sql);
if($res->num_rows > 0){
    // out putenv
    while($row = $res->fetch_assoc()){
        echo "name: ". $row["name"]. " - score: " . $row["score"]."<br>";

    }

}else{
    echo "";
}

$conn->close();
?>

