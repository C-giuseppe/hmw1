<?php 
 require_once 'auth.php';
 if (!$userid = checkAuth()) {
     header("Location: login.php");
     exit;
    }
 $anilist_id=$_GET["anilist_id"];
 $curl=curl_init();
 curl_setopt($curl, CURLOPT_URL, 'https://api.aniapi.com/v1/anime?anilist_id='.$anilist_id);
 curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
 $result=curl_exec($curl);
 curl_close($curl); 
 echo($result);
?>