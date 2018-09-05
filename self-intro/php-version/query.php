<?php
include("receive.php");

$conn = new mysqli("db", "root", "password", "db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
if ($name != '' ){

    $sql = "SELECT * FROM score where s_name = '".$name."' order by s_score desc";
    $res = $conn->query($sql);
    echo "<tr> <th>Score</th> <th>Time</th> </tr>";
    if($res->num_rows > 0){
        // out putenv

        while($row = $res->fetch_assoc()){
            echo "<tr> <td>". $row["s_score"]. "</td> <td>" . $row["s_time"]."s </td></tr>";
        }
    }else{
        echo "";
    }
}else{
    

    $sql = "SELECT * FROM score order by s_score desc， s_time asc";
    $res = $conn->query($sql);
    echo "<tr> <th>Name</th> <th>Score</th> <th>Time</th> </tr>";
    if($res->num_rows > 0){
        // out putenv

        while($row = $res->fetch_assoc()){
            echo "<tr> <td>".$row["s_name"] ."</td> <td>".$row["s_score"]. "</td> <td>" . $row["s_time"]."s </td></tr>";
        }
    }else{
        echo "";
    }
    
}


$conn->close();
?>

