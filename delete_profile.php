<?php
    require_once 'auth.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn)); 
    $id=$_SESSION['id'];
	$res=mysqli_query($conn, "DELETE FROM users where id = '".$id."'"); 
    if($res){
        session_destroy();
        $ris = true;
    }else {
        $ris = false;
    }
    echo json_encode ($ris);
    mysqli_close($conn);
?>