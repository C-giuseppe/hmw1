<?php 
    require_once 'auth.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }

    $curl=curl_init();
    curl_setopt($curl, CURLOPT_URL, 'https://api.jikan.moe/v4/top/anime');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result=curl_exec($curl);
    curl_close($curl); 
    echo($result);
?>