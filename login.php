<?php
     require_once 'auth.php';
     if ($userid = checkAuth()) {
         header("Location: home.php");
         exit;
    }
	
	if(isset($_POST['username']) && isset($_POST['password'])){
		$conn= mysqli_connect("localhost", "root", "" , "progetto") or die (mysql_connect_error());
		
		$username= mysqli_real_escape_string($conn,$_POST["username"]);
		$password=mysqli_real_escape_string($conn,$_POST["password"]);
		$query = "SELECT id, username, password FROM users WHERE username = '".$username."'" ;
		$res=mysqli_query($conn,$query); 
	
		if( mysqli_num_rows($res) > 0) { 
            $entry = mysqli_fetch_assoc($res);
            if (password_verify($password, $entry['password'])) {
                $_SESSION["username"] = $entry["username"];
                $_SESSION["id"] = $entry['id'];
                header("Location: home.php");
                exit;
            }else{
                $errore = true;
            }
        }else {
        $errore = true;
        }
    }	
?>
    
<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8">
	<meta name="viewport"content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./style/style-1.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab&amp;display=swap" rel="stylesheet">
    <script src="./script/validazione-login.js" defer="true"></script>
  </head>

    <body>
    <div id ="overlay"> </div>
        <header> 
            <h1 id= "title">AnimeFound</h1>
        </header>
       
        <section id = 'main'>
            <form id= "login" name="login" method="POST">
                <div class="username">
                    <label for='username'>Nome utente</label>
                    <input type='text' name='username'>
                </div>
                <div class="password">
                    <div><label for='password'>Password</label></div>
                    <div><input type='password' name='password'></div>
                </div>
                <div class="remember">
                    <div><input type='checkbox' name='remember' value="1"></div>
                    <div><label for='remember'>Ricorda l'accesso</label></div>
                </div>
                <div>
                    <input type='submit' value="Accedi">
                </div>
                <div id = errore> 
                    <?php
                    if(isset($errore))  {
                        echo "<p class='errore'>";
                        echo "Credenziali non valide.";
                        echo "</p>";
                    }
                    ?> 
                </div>
             <div id='signup'>
                    Non sei Registrato? <a href="registrazione.php"> Registrati </a>
            </div>
            </form>
        </section> 
    </body>
<html>
