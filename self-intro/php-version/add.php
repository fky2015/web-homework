<?php
require_once("receive.php");

$conn = new mysqli("db", "root", "password", "db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "INSERT INTO score(s_name, s_score) VALUES('".$name."', " . $score . ")";
if($conn->query($sql) == TRUE ){
    echo "seccess";
}
else{
    echo "fail";
}

// if($stmt->execute())
// {
//     ech Uncaughto "success";
// } else {
//     echo "failed";
// };
?>