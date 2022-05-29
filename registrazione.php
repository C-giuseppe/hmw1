<?php
    require_once 'auth.php';

    if (checkAuth()) {
        header("Location: home.php");
        exit;
    }   

    if (!empty($_POST["username"]) && !empty($_POST["password"]) && !empty($_POST["email"]) && !empty($_POST["name"]) && 
        !empty($_POST["surname"]) && !empty($_POST["confirm_password"]) && !empty($_POST["gender"]))
    {
        $alert = array();
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
            $alert[] = "Username non valido";
        } else {
            $username = mysqli_real_escape_string($conn, $_POST['username']);
            $query = "SELECT username FROM users WHERE username = '$username'";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                $alert[] = "Username già utilizzato";
            }
        }
        if (strlen($_POST["password"]) < 8) {
            $alert[] = "Caratteri password insufficienti";
        } 
        if (strcmp($_POST["password"], $_POST["confirm_password"]) != 0) {
            $alert[] = "Le password non coincidono";
        }
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $alert[] = "Email non valida";
        } else {
            $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
            $res = mysqli_query($conn, "SELECT email FROM users WHERE email = '$email'");
            if (mysqli_num_rows($res) > 0) {
                $alert[] = "Email già utilizzata";
            }
        }
        if (count($alert) == 0) { 
            if (isset($_FILES['avatar'])) {
                $file = $_FILES['avatar'];
                $type = exif_imagetype($file['tmp_name']);
                $allowedExt = array(IMAGETYPE_PNG => 'png', IMAGETYPE_JPEG => 'jpg', IMAGETYPE_GIF => 'gif');
                if (isset($allowedExt[$type])) {
                    if ($file['error'] === 0) {
                        if ($file['size'] < 7000000) {
                            $fileNameNew = uniqid('', true).".".$allowedExt[$type];
                            $fileDestination = 'images/'.$fileNameNew;
                            move_uploaded_file($file['tmp_name'], $fileDestination);
                        } else {
                            $alert[] = "L'immagine non deve avere dimensioni maggiori di 7MB";
                        }
                    } else {
                        $alert[] = "Errore nel carimento del file";
                    }
                } else {
                    $alert[] = "I formati consentiti sono .png, .jpeg, .jpg e .gif";
                }
            }
        }

        if (count($alert) == 0) {
            $name = mysqli_real_escape_string($conn, $_POST['name']);
            $surname = mysqli_real_escape_string($conn, $_POST['surname']);

            $password = mysqli_real_escape_string($conn, $_POST['password']);
            $password = password_hash($password, PASSWORD_BCRYPT);
            $genere = mysqli_real_escape_string($conn, $_POST["gender"]);

            $query = "INSERT INTO users(username, nome, cognome, email, password, url_img, genere) VALUES('$username',  '$name', '$surname', '$email','$password', '$fileDestination', '$genere')";
            
            if (mysqli_query($conn, $query)) {
                $_SESSION["username"] = $_POST["username"];
                $_SESSION["id"] = mysqli_insert_id($conn);
                mysqli_close($conn);
                header("Location: home.php");
                exit;
            } else {
                $alert[] = "Errore di connessione al Database";
            }
        }

        mysqli_close($conn);
    }
    else if (isset($_POST["username"])) {
        $alert = array("Riempi tutti i campi");
    }

?>


<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport"content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./style/style-1.css">
        <link rel="stylesheet" href="./style/registrazione.css">
        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab&amp;display=swap" rel="stylesheet">
        <script src="./script/validazione-regstrazione.js" defer="true"></script>
  </head>
  <body>
      <div id ="overlay"> </div>
      <article>
          <header>
              <h1 id="title">AnimeFound</h1>
          </header>
          <div id = main>
              <form name="registrazione" method="POST"enctype="multipart/form-data"  >
                  <div class="name">
                      <label for= "nome"> Nome </label>
                      <input type='text' name='name'>
                      <span> Formato non valido </span>
                  </div>
                  <div class="surname">
                      <label for = "cognome">Cognome </label>
                      <input type='text' name='surname'> 
                      <span> Formato non valido </span>
                  </div>
                  <div class="username">
                      <label for = "username">Username</label> 
                      <input type='text' name='username'>
                      <span>Nome utente non disponibile</span> 
                  </div>
                  <div class="email">
                      <label for = "email" >E-mail </label>
                      <input type='text' name='email'> 
                      <span>Indirizzo email non valido</span>
                  </div>
                  <div class="password">
                      <label for = "password" >Password </label>
                      <input type='password' name='password'> 
                      <span>Inserisci almeno 8 caratteri</span>
                  </div>
                  <div class="confirm_password">
                      <label for ="password">Conferma Password </label>
                      <input type='password' name='confirm_password'>
                      <span>Le password non coincidono</span>
                  </div>
                  <div class = "gender">
                      <label for = "gender"> Genere </label>
                      <label><input type= 'radio' name = 'gender' value= 'm'> Maschio 
                      <input type= 'radio' name = 'gender' value= 'f'>Femmina 
                      </label>
                  </div>
                  <div class="fileupload">
                      <label for='avatar'>Scegli un'immagine profilo</label>
                      <input type='file' name='avatar' accept='.jpg, .jpeg, image/gif, image/png' id="upload_original">
                      <div id="upload"><div class="file_name">Seleziona un file...</div><div class="file_size"></div>
                  </div>
                  <div class="submit">
                      <label>&nbsp; <input type ='submit' value='Registrati'> </label> 
                  </div>
                  <?php
                      if(isset($alert)){
                          foreach($alert as $al){
                              echo "<div class ='errore'>";
                              echo $al  . "\n";
                              echo "</div>";
                            }
                       }
                  ?>
                   <div id='signup'>
                       Sei già registrato? Effetua il  <a href=" login.php"> Login </a>
                  </div>
              </form>
          </div> 
      </article>
  </body>
</html>
