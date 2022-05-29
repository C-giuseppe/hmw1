function onJson(json){
  //console.log(json);
	profile.innerHTML= '' ;	
	for(let i=0; i<json.length;i++){
    const info=json[i];
	  const username = info.username;
    const img_url = info.url_img; 
	  const div_contenitore= document.createElement('div');
	  const div_username= document.createElement('a');
    const div_info = document.createElement('div');
	  div_username.href = "profile.php";
	  div_username.textContent= username;
    const div_lista = document.createElement('a');
    div_lista.href= "lista_anime.php";
    div_lista.textContent = "I Tuoi Preferiti";
	  const img = document.createElement('img');
	  img.src=img_url;
	  div_contenitore.appendChild(img);
	  if(info.genere === 'm'){
      const div= document.createElement('h1');
	    div.textContent='Benvenuto,';
	    div_info.appendChild(div);
    }else{
      const div= document.createElement('h1');
		  div.textContent='Benvenuta,';
      div_info.appendChild(div);
	 }
   div_info.appendChild(div_username);
   div_contenitore.appendChild(div_info);
   div_contenitore.appendChild(div_lista);
	 profile.appendChild(div_contenitore);
   div_info.classList.add('ordine');
   div_contenitore.classList.add('spazio'); 
	}
}

function onResponse(response){
  //console.log('sono la principale');
	return response.json();
}	
function onResponse1(response){
  //console.log('sono la seconda');
	return response.json();
}	

function onJson1(json) {
  //console.log('JSON ricevuto'); console.log(json);
  const d = document.querySelector('#list');
  d.innerHTML = '';
  let result = json.data;
  
  for(let k =0; k<10; k++){
    let rank = result[k].rank;
    let title = result[k].title;
    const mal_id = result[k].mal_id;
    const img = result[k].images.jpg.image_url;
    const i = document.createElement('div');
    const image = document.createElement('img');
    image.src= img;

    const titolo = document.createElement('div');
    titolo.textContent= rank + '. ' + title;
    i.appendChild(image);
    i.appendChild(titolo);
    i.classList.add('block');
    i.setAttribute('data-id', mal_id);
    d.appendChild(i);
    d.classList.add('lan');
    d.classList.remove('off');
  }
  const u = document.querySelectorAll('#list div');
  for ( let r of u){
    r.addEventListener('click', cerca);
  }
}

const profile = document.querySelector('#profile');

function box1(event){
  const l = event.currentTarget;
  const a = document.querySelector('#Tanime');
  const a1 = document.querySelector('#Tmanga');
  const h = document.querySelector('#list');
  const r = document.querySelector('#new_season');
  
  if (event.currentTarget === a){
    //console.log('primo if');
    if (a.classList.value === 'freccia_giu'){
      //console.log('secondo if');
      a.classList.add('freccia_su');
      a.classList.remove('freccia_giu');
      r.classList.add('off');
      fetch("top_anime.php").then(onResponse).then(onJson1);
      if(a1.classList.value === 'freccia_su'){
        //console.log('terzo if')
        a1.classList.add('freccia_giu');
        a1.classList.remove('freccia_su');
        }
    }else {
      //console.log('primo else')
      a.classList.add('freccia_giu');
      a.classList.remove('freccia_su');
      h.classList.remove('lan');     
      h.classList.add('off');
      r.classList.remove('off');
    }
  }else{
    //console.log('secondo else');
    if (a1.classList.value === 'freccia_giu'){
      //console.log('quarto if');
      a1.classList.add('freccia_su');
      a1.classList.remove('freccia_giu');
      r.classList.add('off');
      fetch("top_manga.php").then(onResponse).then(onJson1);
      if(a.classList.value === 'freccia_su'){
        //console.log('quinto if');
        a.classList.add('freccia_giu');
        a.classList.remove('freccia_su');
      }
    }else {
     // console.log('terzo else');
      a1.classList.add('freccia_giu');
      a1.classList.remove('freccia_su');
      h.classList.add('off');
      h.classList.remove('lan');
      r.classList.remove('off');
    }
  }
}

function cerca(event){
  const id = event.currentTarget.dataset.id;
  //console.log(id);
  const Tanime = document.querySelector('#Tanime');
  if(Tanime.classList.value === 'freccia_su'){
    fetch("cerca_anime_home.php?mal_id=" + id).then(onResponse).then(onJson2);
  }else{
    fetch("cerca_manga_home.php?mal_id=" + id).then(onResponse).then(onJson2);
  }
}

function onJson2(json) {
  //console.log('JSON ricevuto'); console.log(json);
  const w = document.querySelector('#information');
  w.classList.remove('off');
  w.innerHTML = '';
  const q = document.querySelector('#list');
  q.classList.add('off');
  
  const titolo = json.data.title;
  const img = json.data.images.jpg.image_url;
  const favorite = json.data.favorites;
  const synopsis = json.data.synopsis;

  const o = document.createElement('div');
  const p = document.createElement('span');
  const t = document.createElement('span');
  t.textContent= titolo;
  const im = document.createElement('img');
  im.src = img;
  let v_p;
  const y = document.createElement('span');
  const f = document.createElement('span');
  f.textContent = 'Scelto come preferito da: ' + favorite + ' utenti';
  const x = document.createElement('span');
  x.textContent = synopsis;
  const back = document.createElement('span');
  back.classList.add('back');
  if(json.data.type === 'TV'){
    v_p = json.data.episodes;
    y.textContent = 'Durata episodi: ' + v_p + ' minuti';
  }else {
    v_p = json.data.volumes;
    y.textContent = 'Numeri volumi: ' + v_p ;
  }
  o.appendChild(im);
  o.appendChild(t);
  o.appendChild(y);
  o.appendChild(f);
  o.appendChild(back);
  p.appendChild(x);

  w.appendChild(o);
  w.appendChild(p);

  const b = document.querySelector('.back');
  b.addEventListener('click', reload);   
}

function reload(){
  const q = document.querySelector('#list');
  q.classList.remove('off');
  const i = document.querySelector('#information');
  i.classList.add('off');
}

fetch("aggiorna_profile.php").then(onResponse).then(onJson);
fetch("new.php").then(onResponse1).then(onJson3);

const to = document.querySelector('#Tanime');
to.addEventListener('click', box1);

const bo = document.querySelector('#Tmanga');
bo.addEventListener('click', box1);

function onJson3(json){
  //console.log('json3'); console.log(json);
  const new_season = document.querySelector('#new_season');
  new_season.innerHTML = '';
  const name = document.createElement('span');
  name.textContent = 'Anime in arrivo';
  const cielo = document.createElement('div');
  const table = document.createElement('div');
  const title = document.createElement('div');
  title.textContent = 'Titolo';
  const year = document.createElement('div');
  year.textContent = 'Anno';
  const tra = document.createElement('div');
  tra.textContent = 'Trailer';
  const ur = document.createElement('div');
  ur.textContent = 'Url-info';
  
   const t = document.createElement('div');
   const y = document.createElement('div');
   const tr = document.createElement('div');
   const u = document.createElement('div');

   const l = document.createElement('div');
   const p = document.createElement('div');
   const o = document.createElement('div');
   const z = document.createElement('div');

   l.appendChild(title);
   p.appendChild(year);
   o.appendChild(tra);
   u.appendChild(ur);

   l.classList.add('top1');
   p.classList.add('top1');
   o.classList.add('top1');
   u.classList.add('top1');

   t.appendChild(l);
   y.appendChild(p);
   tr.appendChild(o);
   z.appendChild(u);

   t.classList.add('titolo');
   y.classList.add('anno');
   tr.classList.add('trailer');
   z.classList.add('url');
   new_season.appendChild(name);

   cielo.appendChild(t);
   cielo.appendChild(y);
   cielo.appendChild(tr);
   cielo.appendChild(z);

   new_season.appendChild(cielo);
   cielo.classList.add('cielo');

  const num = json.data.length;
  //console.log(num);
  for ( let i = 0; i<num; i++){
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');

    const titolo = json.data[i].title;
    const anno = json.data[i].aired.string;
    const trailer = json.data[i].trailer.embed_url;
    const url = json.data[i].url;
    
    const div_titolo = document.createElement('div');
    div_titolo.textContent = titolo;
    const div_anno = document.createElement('div');
    div_anno.textContent = anno;
    const div_trailer = document.createElement('a');
    div_trailer.href = trailer;
    div_trailer.textContent = 'Trailer';
    const div_url = document.createElement('a');
    div_url.href = url;
    div_url.textContent = 'More info';
    
    div1.appendChild(div_titolo);
    div2.appendChild(div_anno);
    div3.appendChild(div_trailer);
    div4.appendChild(div_url);

    div1.classList.add('margine');
    div2.classList.add('margine');
    div3.classList.add('margine');
    div4.classList.add('margine');
    
    t.appendChild(div1);
    y.appendChild(div2);
    tr.appendChild(div3);
    z.appendChild(div4);
    
    cielo.appendChild(t);
    cielo.appendChild(y);
    cielo.appendChild(tr);
    cielo.appendChild(z);
    
    new_season.appendChild(cielo);
  }
}
