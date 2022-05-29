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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Archivio</title>   
    <link rel = "stylesheet" href = "./style/style-2.css">
    <link rel="stylesheet" href="./style/cerca_anime.css">
    <script src="./script/cerca_anime.js" defer></script>
  </head>

  <body>
    <header> 
      <h1 id="title">AnimeFound</h1>
      <div id="link">
        <a href="home.php">HOME </a>
        <a href="cerca_utente.php">CERCA UTENTE </a>
        <a href="logout.php">LOGOUT </a>
      </div>
    </header>

    <section id = 'barra_ricerca'>
      <h1> Ricerca per: </h1>
      <div id = 'scelta'>
        <div data-id = 'nome'> Nome </div>
        <div id = 'bord'> </div>
        <div data-id = 'genere'> Genere </div>
      </div>
    </section>

    <form id='cerca' method = 'GET'>
      Nome anime:
      <input type='text' id='name'>
      <input type='submit' id='submit' value='Cerca'>
    </form>
    
    <form id ='cerca_genere' method = 'GET'> </form>
    <section id="anime-view"> </section>
    <section id = "page"></section>
    <section id = "anime"> </section>
  </body>
</html>