<?php
    require_once 'auth.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn)); 
    $anilist_id = mysqli_real_escape_string($conn,$_GET["anilist_id"]);
    $id=$_SESSION['id'];
    $res = mysqli_query($conn, "DELETE from lista_anime where anilist_id = '$anilist_id' and user = '$id'");
    if($res){   
        $ris = true;
    }else {
        $ris = false;
    }
    echo json_encode ($ris);
    mysqli_close($conn);
?>
