<?php 
    require_once 'auth.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }
    $mal_id=$_GET["mal_id"];
    $stringa=urlencode($mal_id);
    $curl=curl_init();
    curl_setopt($curl, CURLOPT_URL, 'https://api.jikan.moe/v4/manga/'.$stringa.'/full');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result=curl_exec($curl);
    curl_close($curl); 
    echo($result);
?>