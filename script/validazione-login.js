
function validazione(event){
    const error = document.querySelector('#errore');
    error.innerHTML = '';
    if( form.username.value.length === 0 || form.password.value.length === 0)	{

          error.textContent ='Riempire tutti i campi';
          error.classList.add('errore');

          event.preventDefault();
    }	
}
const form=document.querySelector('form');
form.addEventListener('submit',validazione);

    