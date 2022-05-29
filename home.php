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
        <link rel="stylesheet" href="./style/style-home.css">
        <script src="./script/home.js" defer="true"></script>
        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab&amp;display=swap" rel="stylesheet">
    </head>

    <body>
        <header>
            <h1 id="title">AnimeFound</h1>
            <div id ="link">
                <a href="cerca_anime.php">CERCA ANIME </a>
                <a href="cerca_utente.php">CERCA UTENTE </a>
                <a href="logout.php">LOGOUT </a>
            </div>
        </header>

        <article>
            <section id = 'profile'>  </section>
            <div>
                <section id='news'>
                    <div class = 'top'> 
                        <h1> Top anime</h1> 
                        <div id = 'Tanime' class= 'freccia_giu'> </div> 
                    </div>
                    <div> 
                        <h1> Top manga</h1> 
                        <div id = 'Tmanga' class = 'freccia_giu'> </div> 
                    </div>
                </section>
                <section id= 'list'> </section>
                <section id= 'information'> </section>
                <section id = 'new_season'></section>
            <div>
		</article>
    </body>
</html>