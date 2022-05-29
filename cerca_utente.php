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
        <meta charset="utf-8">
	    <meta name="viewport"content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./style/style-2.css">
        <link rel="stylesheet" href="./style/cerca_utente.css">
        <script src="./script/cerca_utente.js" defer="true"></script>
        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab&amp;display=swap" rel="stylesheet">
    </head>

    <body>
        <header>
            <h1 id="title">AnimeFound</h1>
            <div id="link">
                <a href="home.php">HOME </a>
                <a href="cerca_anime.php">CERCA ANIME</a>
                <a href="logout.php">LOGOUT </a>
            </div>
        </header>

        <section id = 'barra_ricerca'>
            <h1> Ricerca per: </h1>
            <div id = 'scelta'>
                <div data-id = 'nome'> Nome </div>
                <div id = 'bord'> </div>
                <div data-id = 'tutti'> Tutti </div>
            </div>
        </section>

        <section id = 'cerca'>
            <form name="cerca" method='get' id = 'searchusers'>
                <label> Scrivi il nome utente da cercare: <input type='text' name='cercausername'></label>
                <label>&nbsp;<input type='submit' value="CERCA"></label>
            </form>
        </section>
        <section id ="users-view" ></section>
        <section id="user-view"></section>
        <section class = 'lista'> Lista Anime Preferiti:</section>
        <section id= "anime-view"> </section>

    </body>
</html>
















