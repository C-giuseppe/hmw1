<?php 
    require_once 'auth.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }
?>
<!DOCTYPE html>
<html>  
    <head>
        <title> AnimeFound </title>
        <meta charset="utf-8">
	    <meta name="viewport"content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./style/style-2.css">
        <link rel="stylesheet" href="./style/lista_anime.css">
        <script src="./script/lista_anime.js" defer="true"></script>
        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab&amp;display=swap" rel="stylesheet">
    </head>

    <body>
        <header>
            <h1 id="title">AnimeFound</h1>
            <div id ="link">
                <a href = "home.php"> HOME </a>
                <a href="cerca_anime.php">CERCA ANIME </a>
                <a href="cerca_utente.php">CERCA UTENTE </a>
                <a href="logout.php">LOGOUT </a>
            </div>
        </header>

        <article>
            <section id = 'lista'> </section>
		    <section id='box-anime'> </section>
            <section id = 'anime'></section>
		</article>

    </body>
</html>