const gratitude = document.getElementById('gratitude');

// En la segunda ventana (después de actualizar)
const datoRecibido = sessionStorage.getItem('miDato');
const objetoRecibido = JSON.parse(datoRecibido);

if (objetoRecibido && objetoRecibido.dato === 'validation') {
    console.log(`Es correcto ${objetoRecibido.dato}`);
    gratitude.classList.remove('ocultar');

} else {
    console.log(`Es incorrecto ${objetoRecibido ? objetoRecibido.dato : 'null'}`);
    let codigo = prompt('Codigo secreto');
    if(codigo === '100000'){
        gratitude.classList.remove('ocultar');
    } else {
        alert('No tienes permitido acceder esta pagina')
    }
}