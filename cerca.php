<?php
 require_once 'auth.php';
 if (!$userid = checkAuth()) {
     header("Location: login.php");
     exit;
    }
 $nome=$_GET["cerca"];
 $stringa=urlencode($nome);
 $curl=curl_init();
 curl_setopt($curl, CURLOPT_URL, 'https://api.aniapi.com/v1/anime?title='.$stringa);
 curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
 $result=curl_exec($curl);
 curl_close($curl); 
 echo($result);
?>