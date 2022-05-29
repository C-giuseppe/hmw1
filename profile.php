
<?php 
    require_once 'auth.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }

$id = $_SESSION['id'];
$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
$alert = array();

if(!empty($_POST['username'])){
    if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
        $alert[] = "Username non valido";
    } else {
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $query = "SELECT username FROM users WHERE username = '$username'";
        $res = mysqli_query($conn, $query);
        if (mysqli_num_rows($res) > 0) {
            $alert[] = "Username già utilizzato";
            mysqli_close($conn);
            exit;
        }
        else {
             $ris=mysqli_query($conn, "UPDATE users SET username = '".$username."' where id = '".$id."'"); 
             if($ris){   
                 $_SESSION["username"] = $_POST["username"];
                 header("Location: profile.php");
                 mysqli_close($conn);
               }
               else{
                    $alert[] = "Errore Query";
                    mysqli_close($conn);
                }  
        }
    } 
}

if(!empty($_POST['email'])){
     if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
         $alert[] = "Email non valida";
     }else{
           $new_email = mysqli_real_escape_string($conn, $_POST["email"]); 
           $ris=mysqli_query($conn, "UPDATE users SET email = '".$new_email."' where id = '".$id."'"); 
           if($ris){
               header("Location: profile.php");
               mysqli_close($conn);
            }
            else {
                $alert[] = "Errore Query";
                mysqli_close($conn);
            }
        }
}

if(!empty($_POST['password'])){
    if (strlen($_POST["password"]) < 8) {
        $alert[] = "Caratteri password insufficienti";
    } else{
        $password = mysqli_real_escape_string($conn, $_POST['password']);
        $password = password_hash($password, PASSWORD_BCRYPT);
        $ris=mysqli_query($conn, "UPDATE users SET password = '".$password."' where id = '".$id."'"); 
        if($ris){   
            header("Location: profile.php");
            mysqli_close($conn);
        }
         else {
            $alert[] = "Errore Query";
            mysqli_close($conn);
        }
    }
}

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
                $ris=mysqli_query($conn, "UPDATE users SET url_img = '$fileDestination' where id = '$id'"); 
                if($ris){
                    header("Location: profile.php");
                    mysqli_close($conn);
                }
                else {
                    $alert[] = "Errore Query";
                    mysqli_close($conn);
                }
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


?>


<!DOCTYPE html>
<html>  
    <head>
        <title> AnimeFound </title>
        <meta charset="utf-8">
	    <meta name="viewport"content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./style/style-2.css">
        <link rel="stylesheet" href="./style/profile.css">
        <script src="./script/profile.js" defer="true"></script>
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
            <section id = "image"></section>
            <section id = information>
                <section id = "termini">
                    <span> Username: </span>
                    <span> Nome: </span>
                    <span> Cognome: </span>
                    <span> Genere: </span>
                    <span> Email: </span>
                    <span> Password: </span>
                    <span> Img_Profilo: </span>
                </section>
                <section id = "profile"> </section>
                <section id = "main">    
                    <form name = "modifica" method= "POST" enctype="multipart/form-data" >  
                        <div id = 'username'>
                            <label><input type='text' name='username' class = 'text'> </label>
                            <label>&nbsp; <input type ='submit' value='modifica_username'> </label>
                            <span>Nome utente non disponibile</span> 
                        </div> 
                  
                        <div id = 'email'>
                            <label><input type='text' name='email'> </label>
                            <label>&nbsp; <input type ='submit' value='modifica_email'> </label> 
                            <span>Indirizzo email non valido</span>
                        </div>

                        <div id = 'password'>
                            <label> <input type='password' name='password'></label>
                            <label>&nbsp; <input type ='submit' value='modifica_password'> </label>
                            <span>Inserisci almeno 8 caratteri</span>
                        </div>

                        <div class="fileupload">
                            <input type='file' name='avatar' accept='.jpg, .jpeg, image/gif, image/png' id="upload_original">
                            <div id="upload"><div class="file_name">Seleziona un file...</div><div class="file_size"></div></div>
                            <label>&nbsp; <input type ='submit' value='invia'> </label>
                        </div>
                    </form>
                </section>
            </section>
            <?php 
               if(isset($alert)){
                foreach($alert as $al){
                    echo "<div class ='errore'>";
                    echo $al  . "\n";
                    echo "</div>";
                  }
               }
            ?>
            <section id = delete> <label>&nbsp; <input type ='submit' value='Elimina_Account'> </label> </section>
        </article>   
    </body>
</html>