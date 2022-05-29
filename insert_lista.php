<?php
    require_once 'auth.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn)); 

    $nome= mysqli_real_escape_string($conn,$_GET["nome"]);
    $img_url=mysqli_real_escape_string($conn,$_GET["img_url"]);
    $anilist_id = mysqli_real_escape_string($conn,$_GET["anilist_id"]);
    $id=$_SESSION['id'];
    mysqli_query($conn, "INSERT INTO  lista_anime(nome, url_img, user, anilist_id) values (\"$nome\", \"$img_url\",\"$id\", \"$anilist_id\")");
    mysqli_close($conn);
?>