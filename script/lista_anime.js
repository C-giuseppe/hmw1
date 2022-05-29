function onJson1(json){
  //console.log(json);
  box.innerHTML= '' ;
  box.classList.remove('off');
  const section = document.querySelector('#anime');
  section.innerHTML = '';
  section.classList.add('off');
  const j = document.querySelector('#lista');
  j.innerHTML= '';
  
  const div_lista = document.createElement('div');
  div_lista.textContent = 'Anime Preferiti:';
  j.appendChild(div_lista);
  
  if (json ==='Nessun anime'){
    const div_contenitore= document.createElement('div');
    const div= document.createElement('div');
    div.textContent='Non hai ancora aggiunto anime alla tua lista';
    div_contenitore.appendChild(div);
    box.appendChild(div_contenitore);
  }else {
    for(let i=0; i<json.length;i++){	
      const info=json[i];
      const anilist_id =info.anilist_id;
      const titolo=info.nome;
      const img_url=info.url_img; 
    
      const div_contenitore= document.createElement('div');
      const div_titolo= document.createElement('h1');
      div_titolo.textContent= titolo;
      const img = document.createElement('img');
      img.src=img_url;
                 
      div_contenitore.appendChild(img);
      div_contenitore.setAttribute('data-id', anilist_id);
      div_contenitore.setAttribute('data-nome', titolo);
      div_contenitore.appendChild(div_titolo);
  
      box.appendChild(div_contenitore);
      div_contenitore.classList.add('cont');
    }
  }
  let risposte = document.querySelectorAll('#box-anime div.cont');
  for(let risp of risposte){
    risp.addEventListener('click', anime);
  }
}

function onResponse1(response){
    return response.json();
}		
    

function onJson2(json) {
  //console.log('JSON ricevuto'); console.log(json);
  const library = document.querySelector('#anime');
  library.innerHTML = '';
  library.classList.remove('off');
	const l = document.querySelector('#lista');
  l.innerHTML = '';
  l.classList.add('off');
  const section = document.querySelector('#box-anime');
  section.innerHTML = '';
  section.classList.add('off');

  const results = json.data.documents;
  let num_result = json.data.count;
  for(let i=0; i<num_result; i++){
    const album_data = results[i];
    const cover_image = album_data.cover_image;
    img_url = cover_image;
    const text = album_data.titles.en;
    const anilist_id = album_data.anilist_id;
    id= anilist_id;
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
    star.classList.add('star_off');
    const back = document.createElement('div');
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
  } 
  const b = document.querySelector('.back');
  b.addEventListener('click', home);       
  const a = document.querySelector('.star_off');
  a.addEventListener('click', delete_lista);
}
  
function anime(event){
  const risp = event.currentTarget; 
  const anilist_id = risp.dataset.id ;
  const nome = risp.dataset.nome;
  //console.log(anilist_id); console.log('Eseguo ricerca: ' +  nome);
  fetch("cerca2.php?cerca="+nome + "&anilist_id="+ anilist_id).then(onResponse).then(onJson2);
  const library = document.querySelector('#box-anime');
  library.classList.add('off');
}

function onJson3(json){
  // console.log('JSON ricevuto'); console.log(json);
  if(json){
    home();
  }
}

function onResponse(response) {
  //console.log('Risposta ricevuta');
  return response.json();
}

function home(){
  const l = document.querySelector('#lista');
  l.innerHTML = '';
  l.classList.remove('off');
  fetch("aggiorna_lista.php").then(onResponse).then(onJson1);
}

function delete_lista(){
  fetch("delete_lista.php?anilist_id=" + id).then(onResponse).then(onJson3);
}

fetch("aggiorna_lista.php").then(onResponse).then(onJson1);
const box = document.querySelector('#box-anime');
let id;