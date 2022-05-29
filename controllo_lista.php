<?php
    require_once 'auth.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn)); 
    $ris = [];
    $anilist_id = mysqli_real_escape_string($conn,$_GET["anilist_id"]);
    $id=$_SESSION['id'];
    $res = mysqli_query($conn, "SELECT * from  lista_anime where anilist_id = '$anilist_id' and user = '$id'");
    if(mysqli_num_rows($res) > 0){   
        $ris[0]= 'true';
        $ris[1] = $anilist_id;
    }else {
        $ris[0] = 'false';
        $ris[1] = $anilist_id;
    }
        
    $lan = json_encode ($ris);
    echo $lan;
    mysqli_close($conn);
?>