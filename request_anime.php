<?php
    require_once 'auth.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn)); 
    $nome = mysqli_real_escape_string($conn, $_GET["username"]);
    $query = mysqli_query($conn, "SELECT id FROM users where username= '".$nome."'");
    $res=mysqli_query($conn, "SELECT * FROM lista_anime where user = (SELECT id FROM users where username= '".$nome."')"); 
    if(mysqli_num_rows($res) > 0){   
        while($row= mysqli_fetch_assoc($res)) {
            $stampa[]=$row;
        }
    }else {
        $stampa = "Nessun anime in lista";
    }
    mysqli_close($conn);
    echo json_encode($stampa);

?>