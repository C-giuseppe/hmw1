function onJson(json){
    //console.log(json);
	profile.innerHTML= '' ;	
	image.innerHTML = '';
    
	for(let i=0; i<json.length;i++){
		
	 const info=json[i];
	 const username = info.username;
     const nome = info.nome;
     const cognome = info.cognome;
     const email = info.email;
	
     const url_img = info.url_img; 
	 const genere = info.genere;

	 const div_contenitore= document.createElement('div');
	 const div_img = document.createElement('div');
	 const div_username= document.createElement('div');
	 div_username.textContent= username;
	 const img = document.createElement('img');
	 img.src=url_img;

	 const div_genere = document.createElement('div');
	 div_genere.textContent= genere;
     const div_nome= document.createElement('div');
	 div_nome.textContent= nome;
     const div_cognome= document.createElement('div');
	 div_cognome.textContent= cognome;
     const div_email= document.createElement('div');
	 div_email.textContent= email;

     div_contenitore.appendChild(div_username);
	 div_contenitore.appendChild(div_nome);
	 div_contenitore.appendChild(div_cognome);
	 div_contenitore.appendChild(div_genere);
	 div_contenitore.appendChild(div_email);

	 div_img.appendChild(img);
     image.appendChild(div_img);

	 profile.appendChild(div_contenitore);
     div_contenitore.classList.add('spazio'); 
	
	}
}

	
function onResponse(response){
	return response.json();
}	

function clickSelectFile(event) {
    upload_original.click();
}

function checkUpload(event) {
    const upload_original = document.getElementById('upload_original');
    document.querySelector('#upload .file_name').textContent = upload_original.files[0].name;
    const o_size = upload_original.files[0].size;
    const mb_size = o_size / 1000000;
    document.querySelector('#upload .file_size').textContent = mb_size.toFixed(2)+" MB";
    const ext = upload_original.files[0].name.split('.').pop();

    if (o_size >= 7000000) {
        document.querySelector('.fileupload span').textContent = "Le dimensioni del file superano 7 MB";
        document.querySelector('.fileupload').classList.add('errorj');
    } else if (!['jpeg', 'jpg', 'png', 'gif'].includes(ext))  {
        document.querySelector('.fileupload span').textContent = "Le estensioni consentite sono .jpeg, .jpg, .png e .gif";
        document.querySelector('.fileupload').classList.add('errorj');
    } else {
        document.querySelector('.fileupload').classList.remove('errorj');
    }

}



function onJson1(json){
    console.log('JSON ricevuto');
    console.log(json);
    if(json){
        window.location.reload();
    }
    
  }

  function onResponse1(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }


function func_delete(){
    fetch("delete_profile.php").then(onResponse1).then(onJson1);
}


document.getElementById('upload').addEventListener('click', clickSelectFile);
document.getElementById('upload_original').addEventListener('change', checkUpload);



const profile = document.querySelector('#profile');
const image = document.querySelector('#image');

const del = document.querySelector("#delete");
del.addEventListener('click', func_delete);



fetch("aggiorna_profile.php").then(onResponse).then(onJson);


function jsonCheckUsername(json) {
    if (!json.exists) {
        document.querySelector('#username').classList.remove('errorj');
    } else {
        document.querySelector('#username span').textContent = "Nome utente già utilizzato";
        document.querySelector('#username').classList.add('errorj');
    }
}

function jsonCheckEmail(json) {
    if (!json.exists) {
        document.querySelector('#email').classList.remove('errorj');
    } else {
        document.querySelector('#email span').textContent = "Email già utilizzata";
        document.querySelector('#email').classList.add('errorj');
    }
}

function fetchResponse(response) {
    if (!response.ok) return null;
    return response.json();
}

function checkUsername(event) {
    if(!/^[a-zA-Z0-9_]{1,15}$/.test(username.value)) {
        document.querySelector('#username span').textContent = "Sono ammesse lettere, numeri e underscore. Max. 15"; 
        document.querySelector('#username').classList.add('errorj');
    } else {
        fetch("check_username.php?q="+encodeURIComponent(username.value)).then(fetchResponse).then(jsonCheckUsername);
    }    
}

function checkEmail(event) {
    const emailInput = document.querySelector('#email input');
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(emailInput.value).toLowerCase())) {
        document.querySelector('#email span').textContent = "Email non valida";
        document.querySelector('#email').classList.add('errorj');
    } else {
        fetch("check_email.php?q="+encodeURIComponent(String(emailInput.value).toLowerCase())).then(fetchResponse).then(jsonCheckEmail);
    }
}

function checkPassword(event) {
    const passwordInput = document.querySelector('#password input');
    if ( passwordInput.value.length >= 8) {
        document.querySelector('#password').classList.remove('errorj');
    } else {
        document.querySelector('#password').classList.add('errorj');
    }
}




const username = document.querySelector('#username input.text')
username.addEventListener('blur', checkUsername);
const email = document.querySelector('#email input')
email.addEventListener('blur', checkEmail);
const password = document.querySelector('#password input')
password.addEventListener('blur', checkPassword);