let valori = ['Action',"Adventure","Comedy","Drama","Fantasy","Horror",
              "Mahou Shoujo","Mecha","Music","Mystery","Psychological","Romance","Sci-Fi","Slice Of Life","Sports",
              "Supernatural","Thriller","Anti-Hero","Female Protagonist","Male Protagonist",
              "Age Regression","Aliens","Artificial Intelligence","Demons","Detective","Dinosaurs",
              "Hikikomori","Idol","Maids","Ninja","Pirates","Robots",
              "Vampire","Josei","Seinen","Shoujo","Shounen","Dungeon",
              "School","Historical","Post-Apocalyptic","Space","Virtual World",
             "Espionage","Guns","Martial Arts","Swordplay","Acting",
              "Classic Literature","Drawing","Fashion","Food","Musical",
              "Tragedy","Isekai","Magic","Mythology",
              "Super Power","Superhero","Youkai","Video Games","Card Battle","Poker","Shogi",
              "Athletics","Biographical",
              "Crime","Death Game","Economics",
              "Lost Civilization","Medicine","Pandemic",
              "Reincarnation","Survival","Terrorism","War","Assassins",
              "Gangs","Military","Police","Boys' Love","Harem","Reverse Harem","Yuri"
              ];

let check = ['uno_checked', 'due_unchecked', 'tre_unchecked', 'quattro_unchecked', 'cinque_unchecked'];
let check_val = ['uno', 'due', 'tre', 'quattro', 'cinque'];

function load(event){
  const risp = event.currentTarget;
  const valore = risp.dataset.id;
  const cerca_nome = document.querySelector('#cerca');
  const cerca_genere = document.querySelector('#cerca_genere');
  const anime_view = document.querySelector('#anime-view');
  const anime = document.querySelector('#anime');
  const page = document.querySelector('#page');
  //console.log(valore);
  if(valore === 'nome'){
    if(cerca_nome.classList.value !== 'onok'){
      cerca_nome.classList.add('onok');
      page.classList.add('off');
    }else {
      cerca_nome.classList.remove('onok');
      anime_view.classList.add('off');
      page.classList.add('off');
    }
    if(cerca_genere.classList.value === 'onok'){
      cerca_genere.classList.remove('onok');
      anime_view.classList.add('off');
      anime.classList.add('off');
    }
  }else if (valore === 'genere'){
    if(cerca_genere.classList.value !== 'onok'){
      cerca_genere.classList.add('onok');
      page.classList.add('off');
      riempi();
    }else {
      cerca_genere.classList.remove('onok');
      anime_view.classList.add('off');
      page.classList.add('off');
    }
    if(cerca_nome.classList.value === 'onok'){
      cerca_nome.classList.remove('onok');
      anime_view.classList.add('off');
      anime.classList.add('off');
    }
  }
}

const div_nome = document.querySelectorAll('#scelta div');
for(let i of div_nome){
   i.addEventListener('click', load);
}

function riempi(){
  const val = document.querySelector('#cerca_genere');
  val.innerHTML = '';
  val.textContent = 'Scegli il genere:';
  const divblock = document.createElement('div');
  for(let i of valori){
    const div_contenitore = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'genere';
    input.value = i;
    div_contenitore.textContent = i;
    div_contenitore.appendChild(input);
    div_contenitore.classList.add('stile');
    divblock.appendChild(div_contenitore);
  }
  divblock.classList.add('block');
  val.appendChild(divblock);
  const sub = document.createElement('input');
  sub.type= 'submit';
  sub.id= 'submit';
  sub.value = 'cerca';
  val.appendChild(sub);
  const sumbit = document.querySelector('#cerca_genere');
  sumbit.addEventListener('submit', cerca_anime);
}

function cerca_anime(event){
  const select = document.querySelectorAll('label input');
  let valore;
  controller = true;
  control1 = true;
  for (let i of select){
    if (i.checked){
      //console.log(i.value);
      valore = i.value;
    }
  }
  fetch("genere.php?valore=" +valore).then(onResponse).then(onJson);
  event.preventDefault();
}
function cerca_anime2(event){
  const select = document.querySelectorAll('label input');
  let valore;
  controller = false;
  for (let i of select){
    if (i.checked){
      //console.log(i.value);
      valore = i.value;
    }
  }
  fetch("genere.php?valore=" +valore).then(onResponse).then(onJson);
  event.preventDefault();
}

function onJson(json) {
  //console.log('JSON ricevuto'); console.log(json);
  const library = document.querySelector('#anime-view');
  library.innerHTML = '';
  library.classList.remove('off');
  const section = document.querySelector('#anime');
  section.innerHTML = '';
  section.classList.add('off');   
  const results = json.data.documents;
  let num_result;
  let i ;
  //console.log(results.length);  
  if(controller === true){
    if(results.length === 100){
      lent = 5;
    }else if(results.length <=20){
      lent = 1;
    }else if(results.length <=40){
      lent = 2;
    }else if(results.length <=60){
      lent = 3;
    }else if(results.lenght <= 80){
      lent = 4;
    }
    //console.log(lent); //console.log('if');
    const page = document.querySelector('#page');
    page.innerHTML = '';
    page.classList.remove('off');
    for (let i = 0; i<lent; i++){
      const num = document.createElement('div');
      num.classList.add(check[i]);
      num.id = check_val[i];
      page.appendChild(num); 
    }
    const pages = document.querySelectorAll('#page div');
    for( let p of pages){
      p.addEventListener('click', gira);
    }
  }
  if(control1){
    if(json.data.count <= 20){
      num_result = json.data.count;
    }else{
      num_result = 20;
    }  
    i = 0;
  } else if(control2){
    if(json.data.count <= 40){
      num_result = json.data.count;
    }else{
      num_result = 40;
    }  
    i = 20;
  }else if(control3){
    if(json.data.count <= 60){
      num_result = json.data.count;
    }else{
      num_result = 60;
    }
    i = 40;
  }else if(control4){
    if(json.data.count <= 80){
      num_result = json.data.count;
    }else{
      num_result = 80;
    }  
    i = 60;
  }else if(control5){
    num_result = 100;
    i = 80;
  }
  for(i; i<num_result; i++){
    const album_data = results[i];
    const cover_image = album_data.cover_image;
    const album = document.createElement('div');
    const img = document.createElement('img');
    img.src = cover_image;
    const anilist_id = album_data.anilist_id;
    album.appendChild(img);
    album.setAttribute('data-id', anilist_id);
    library.appendChild(album);
  }    
  let risposte = document.querySelectorAll('#anime-view div');
  for(const risp of risposte){ 
    risp.addEventListener('click', controllo);
  }  
}

function gira(event){
  event.preventDefault(); 
  const varl = event.currentTarget; 
  //console.log(varl.classList.value);
  const uno = document.querySelector('#uno');
  if(lent === 2){
    const due = document.querySelector('#due');
    if(varl.classList.value === 'due_unchecked'){
      due.classList.add('due_checked');
      uno.classList.add('uno_unchecked');
      uno.classList.remove('uno_checked');
      control2 = true;
      control1 = false;
    }else {
      due.classList.add('due_unchecked');
      uno.classList.add('uno_checked');
      due.classList.remove('due_checked');
      control1 = true;
      control2 = false;
    }
  }else if(lent === 3){
    const due = document.querySelector('#due');
    const tre = document.querySelector('#tre');
    if(varl.classList.value === 'tre_unchecked'){
      tre.classList.add('tre_checked');
      uno.classList.add('uno_unchecked');
      uno.classList.remove('uno_checked');
      due.classList.add('due_unchecked');
      due.classList.remove('due_checked');
      control3 = true;
      control2 = false;
      control1 = false;
    }else if(varl.classList.value === 'due_unchecked') {
      due.classList.add('due_checked');
      uno.classList.add('uno_unchecked');
      uno.classList.remove('uno_checked');
      tre.classList.add('tre_unchecked');
      tre.classList.remove('tre_checked');
      control3 = false;
      control2 = true;
      control1 = false;
    }else{
      due.classList.add('due_unchecked');
      uno.classList.add('uno_checked');
      due.classList.remove('due_checked');
      tre.classList.add('tre_unchecked');
      tre.classList.remove('tre_checked');
      control3 = false;
      control2 = false;
      control1 = true;
    }
  }else if (lent === 4){
    const due = document.querySelector('#due');
    const tre = document.querySelector('#tre');
    const quattro = document.querySelector('#quattro');
    if(varl.classList.value === 'quattro_unchecked'){
      quattro.classList.add('quattro_checked');
      uno.classList.add('uno_unchecked');
      uno.classList.remove('uno_checked');
      due.classList.add('due_unchecked');
      due.classList.remove('due_checked');
      tre.classList.add('tre_unchecked');
      tre.classList.remove('tre_checked');
      control4 = true;
      control3 = false;
      control2 = false;
      control1 = false;
    }
    else if(varl.classList.value === 'tre_unchecked'){
      tre.classList.add('tre_checked');
      uno.classList.add('uno_unchecked');
      uno.classList.remove('uno_checked');
      due.classList.add('due_unchecked');
      due.classList.remove('due_checked');
      quattro.classList.add('quattro_unchecked');
      quattro.classList.remove('quattro_checked');
      control4 = false;
      control3 = true;
      control2 = false;
      control1 = false;
    }else if(varl.classList.value === 'due_unchecked') {
      due.classList.add('due_checked');
      uno.classList.add('uno_unchecked');
      uno.classList.remove('uno_checked');
      tre.classList.add('tre_unchecked');
      tre.classList.remove('tre_checked');
      quattro.classList.add('quattro_unchecked');
      quattro.classList.remove('quattro_checked');
      control4 = false;
      control3 = false;
      control2 = true;
      control1 = false;
    }else{
      due.classList.add('due_unchecked');
      uno.classList.add('uno_checked');
      due.classList.remove('due_checked');
      tre.classList.add('tre_unchecked');
      tre.classList.remove('tre_checked');
      quattro.classList.add('quattro_unchecked');
      quattro.classList.remove('quattro_checked');
      control4 = false;
      control3 = false;
      control2 = false;
      control1 = true;
    }
  }else {
    const due = document.querySelector('#due');
    const tre = document.querySelector('#tre');
    const quattro = document.querySelector('#quattro');
    const cinque = document.querySelector('#cinque');
    if(varl.classList.value === 'cinque_unchecked'){
      cinque.classList.add('cinque_checked');
      uno.classList.add('uno_unchecked');
      uno.classList.remove('uno_checked');
      due.classList.add('due_unchecked');
      due.classList.remove('due_checked');
      tre.classList.add('tre_unchecked');
      tre.classList.remove('tre_checked');
      quattro.classList.add('quattro_unchecked');
      quattro.classList.remove('quattro_checked');
      control5 = true;
      control4 = false;
      control3 = false;
      control2 = false;
      control1 = false;
    }
    else if(varl.classList.value === 'quattro_unchecked'){
      quattro.classList.add('quattro_checked');
      uno.classList.add('uno_unchecked');
      uno.classList.remove('uno_checked');
      due.classList.add('due_unchecked');
      due.classList.remove('due_checked');
      tre.classList.add('tre_unchecked');
      tre.classList.remove('tre_checked');
      cinque.classList.add('cinque_unchecked');
      cinque.classList.remove('cinque_checked');
      control5 = false;
      control4 = true;
      control3 = false;
      control2 = false;
      control1 = false;
    }
    else if(varl.classList.value === 'tre_unchecked'){
      tre.classList.add('tre_checked');
      uno.classList.add('uno_unchecked');
      uno.classList.remove('uno_checked');
      due.classList.add('due_unchecked');
      due.classList.remove('due_checked');
      quattro.classList.add('quattro_unchecked');
      quattro.classList.remove('quattro_checked');
      cinque.classList.add('cinque_unchecked');
      cinque.classList.remove('cinque_checked');
      control5 = false;
      control4 = false;
      control3 = true;
      control2 = false;
      control1 = false;
    }else if(varl.classList.value === 'due_unchecked') {
      due.classList.add('due_checked');
      uno.classList.add('uno_unchecked');
      uno.classList.remove('uno_checked');
      tre.classList.add('tre_unchecked');
      tre.classList.remove('tre_checked');
      quattro.classList.add('quattro_unchecked');
      quattro.classList.remove('quattro_checked');
      cinque.classList.add('cinque_unchecked');
      cinque.classList.remove('cinque_checked');
      control5 = false;
      control4 = false;
      control3 = false;
      control2 = true;
      control1 = false;
    }else{
      due.classList.add('due_unchecked');
      uno.classList.add('uno_checked');
      due.classList.remove('due_checked');
      tre.classList.add('tre_unchecked');
      tre.classList.remove('tre_checked');
      quattro.classList.add('quattro_unchecked');
      quattro.classList.remove('quattro_checked');
      cinque.classList.add('cinque_unchecked');
      cinque.classList.remove('cinque_checked');
      control5 = false;
      control4 = false;
      control3 = false;
      control2 = false;
      control1 = true;
    }
  }
  const cerca_genere = document.querySelector('#cerca_genere');
  if(cerca_genere.classList.value === 'onok'){
     cerca_anime2(event);
  }else{
    search2(event);
  }
}

function onResponse(response) {
  //console.log('Risposta ricevuta');
  return response.json();
}

function onJson1(json) {
  //console.log('JSON ricevuto');
  const library = document.querySelector('#anime');
  library.innerHTML = '';
  library.classList.remove('off');
  const section = document.querySelector('#anime-view');
  section.innerHTML = '';
  section.classList.add('off');
  const page = document.querySelector('#page');
  page.classList.add('off');
  //console.log('JSON ricevuto'); //console.log(json); 
  const results = json.data.documents;
  const album_data = results[0];
  const cover_image = album_data.cover_image;
  img_url = cover_image;
  const text = album_data.titles.en;
  nome = text;
  const anilist_id = album_data.anilist_id;
  id = anilist_id;
  const ep = album_data.episode_duration;
  const cont_ep = album_data.episodes_count;
  let descr;
  if (album_data.descriptions.it !== undefined){ 
    descr = album_data.descriptions.it;     
  }else {
    descr = album_data.descriptions.en;
  }
  const album = document.createElement('div');
  const star = document.createElement('div');
  if(control === 'true'){
    star.classList.add('star_off_1');
    star.id ='star'
  }else {
    star.classList.add('star_off');
    star.id ='star'
  }
  const back = document.createElement('span');
  back.classList.add('back');
  const box = document.createElement('span');
  const img = document.createElement('img');
  img.src = cover_image;
  const title = document.createElement('span');
  title.textContent= text;
  const descriptions = document.createElement('span');
  descriptions.textContent= descr;
  const ep_time = document.createElement('span');
  ep_time.textContent = "Durata episodi: " + ep + " minuti";
  const ep_num = document.createElement('span');
  ep_num.textContent = "Numero episodi: " + cont_ep;
  box.appendChild(descriptions);
  album.appendChild(back);
  album.appendChild(star);
  album.appendChild(img);
  album.appendChild(title);
  album.appendChild(ep_num);
  album.appendChild(ep_time);
  album.setAttribute('data-id', anilist_id);
  library.appendChild(album);
  library.appendChild(box);   
  const cerca = document.querySelector('#cerca');
  const b = document.querySelector('.back');
  if(cerca.classList.value === 'onok'){
    b.addEventListener('click', search);  
  } else {
    b.addEventListener('click', cerca_anime);
  }
  const l = document.querySelector('#star');
  //console.log(l);
  l.addEventListener('click', lista);
}
  
function search(event){ 
  controller = true; 
  control1 = true;
  const name_value = form.name.value;
  nome = name_value;
  //console.log('Eseguo ricerca: ' +  name_value);
  fetch("cerca.php?cerca="+name_value).then(onResponse).then(onJson);
  event.preventDefault();  
}

function search2(event){ 
  controller = false;
  const name_value = form.name.value;
  nome = name_value;
  //console.log('Eseguo ricerca: ' +  name_value);
  fetch("cerca.php?cerca="+name_value).then(onResponse).then(onJson);
  event.preventDefault();  
}

function anime(anilist_id){
  //console.log(anilist_id);
  fetch("cerca2.php?&anilist_id="+ anilist_id).then(onResponse).then(onJson1);
  const library = document.querySelector('#anime-view');
  library.classList.add('off');
}

function onJson2(json) {
  //console.log('JSON ricevuto'); //console.log(json);
  const boolean = json[0];
  //console.log(boolean);
  control = boolean;
  const anilist_id = json[1];
  anime(anilist_id);
}

function controllo(event){
  //console.log('sono controllo');
  const risp = event.currentTarget; 
  const anilist_id = risp.dataset.id ;
  // console.log(anilist_id); // console.log('Eseguo controllo: ' +  anilist_id);
  fetch("controllo_lista.php?&anilist_id="+ anilist_id).then(onResponse).then(onJson2);
}

const form = document.querySelector('#cerca');
form.addEventListener('submit', search);

 function lista(event){
  event.preventDefault();
  const l = document.querySelector('#star');
  if(l.classList.value === 'star_off'){
    l.classList.add('star_off_1');
    l.classList.remove('star_off');
    fetch("insert_lista.php?nome=" + nome +"&img_url="+ img_url + "&anilist_id=" + id); 
  }else{
    l.classList.add('star_off');
    l.classList.remove('star_off_1'); 
    fetch("delete_lista.php?nome=" + nome +"&img_url="+ img_url + "&anilist_id=" + id);   
  }
}

let nome;
let img_url;
let id;
let control;
let control2;
let control1 = true;
let control3;
let control4;
let control5;
let controller = true;
let lent = 0;