<?php
    require_once 'auth.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn)); 

    $nome = mysqli_real_escape_string($conn, $_GET["cercausername"]);
	$res=mysqli_query($conn, "SELECT username, nome, cognome, url_img FROM users where username= '".$nome."'"); 


    if(mysqli_num_rows($res) > 0){   
        while($row= mysqli_fetch_assoc($res)) {
        $stampa[]=$row;
        }
    }else {
        $stampa = "Nessun risultato";
    }

    
    mysqli_close($conn);
    echo json_encode($stampa);
    

?>


