<?php
require_once "receive.php";

$conn = new mysqli("db", "root", "password", "db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// $sql = "INSERT INTO score(s_name, s_score, s_time) VALUES('" . $name . "', " . $score . "," . $time . ")";
// if ($conn->query($sql) == true) {
//     echo "seccess";
// } else {
//     echo "fail";
// }

// 尝试加入prepare 以防止注入

if($stmt = $conn->prepare("INSERT INTO score(s_name, s_score, s_time) VALUES(?,?,?)")){
    if(!$stmt->bind_param("sdi",$name,$score,$time)){
        die("bind_param return error!");
    }
    $stmt->execute();
    $stmt->close();
};