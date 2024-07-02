import {data} from './data.js';
import { canciones } from './music.js'; 

//Declaracion de variables para los botones y vistas, manipulacion de DOM

//Vistas
const vI = document.querySelector('#vI');
const vII = document.querySelector('#vII');
const vIII = document.querySelector('#vIII');

//Botones para cambiar de vista
const btnI = document.querySelector('#btnI');
const btnII = document.querySelector('#btnII');

//Boton para pasar a la siguiente pregunta
const btnSP = document.querySelector('#btnSP');

//Preguntas
const preguntas = document.querySelector('.preguntas');

//Div que contiene las opciones a sustituir por el data.js
const opc = document.querySelector('#opc');

//Imagenes que luego seran modificadas mediante el DOM
const imagenes = document.querySelectorAll('.imagenes');

// Barra de progreso
const BDP = document.querySelector('.progress .progress-bar'); 

//Div y boton para volver a intentarlo si falla todas las preguntas
const btnvi = document.querySelector('#btnvi'); 
const viDIV = document.querySelector('#viDIV');

//Div que contiene los resultados correctos e incorrectos
const resultados_correctos = document.getElementById('resultados_correctos')
const resultados_incorrectos = document.getElementById('resultados_incorrectos');

//Texto de calificacion y felicitaciones
const texto_calificacion = document.getElementById('texto_calificacion'); 
const texto_felicitaciones = document.getElementById('texto_felicitaciones');

//Cofre para abrir con una clave
const cofre = document.querySelector('.cofre'); 

const reiniciar_preguntas = document.querySelector('#reiniciar_preguntas'); //Boton para reiniciar las preguntas

const btn_home = document.getElementById('btn_home');
const btn_home_end = document.getElementById('btn_home_end');

//Reproducir cancion
const miAudio = document.getElementById('mi-audio');
const botonReproducir = document.getElementById("boton-reproducir");
const botonPausar = document.getElementById("boton-pausar");

//Reprodicir cancion de la vista III

const botonReproducir_II = document.getElementById("boton-reproducir_II");
const botonPausar_II = document.getElementById("boton-pausar_II");

//Nombre de la cancion
const spanNombreCancion = document.querySelector(".nameMusic");
//Span progreso de la cancion
const spanPorcentajeProgreso = document.querySelector(".spg");

//Input de la imagen de burro al inicio
const password_burro = document.getElementById('password_burro');
//modal de burro
const modal_burro = document.getElementById('burro');

//Modal de letras secretas
const letras_secretas = document.getElementById('letras_secretas');
//modal del cofre
const modal_cofre = document.getElementById('cofre');

const texto_resultado = document.querySelector('.texto-resultado');

const codigo_100000 = document.getElementById('codigo_100000');

//div de los resultados al final de la vista 3 - info-CRPCI

const info_CRPCI = document.querySelector('.info-CRPCI');

let reproduciendo = false;

let cancionAnterior = null;

//Contador que aumenta para pasar a la siguiente pregunta
let sp = 0;

//Resta si la opcion es incorrecta
let r = 10;

// Barra de progreso
let contadorBDP = 0; 

// Encuentra la letra específica que deseas resaltar según la pregunta y opciones
let LE;
let LEO;
let TextR;
let TextRO;

let tp, pp;

//Variable que guarda la vista
let guardaVista;

//Vista 0, input del inicio svg burro
password_burro.addEventListener('input', function() {
    const codigoCorrecto = "100000";
    const codigoIngresado = this.value.replace(/\D/g, ''); // Elimina caracteres no numéricos

    if (codigoIngresado.length === 6) {
        if (codigoIngresado === codigoCorrecto) {
            password_burro.style.color = '#07cc00';
            setTimeout(function() {
                this.value = ''; // Borra el contenido del campo
            }, 1000); // 2000 milisegundos = 2 segundos 
        } else {
            password_burro.style.color = '#cc0000'; // Restaura el color original
        }
        setTimeout(function() {
            if (codigoIngresado === codigoCorrecto) {
                vI.classList.add('ocultar');
                vIII.classList.remove('ocultar');
                modal_burro.style.display = 'none';
                document.querySelector('.modal-backdrop').remove(); // Elimina la capa de fondo
                
                texto_resultado.textContent = `TRUCO APLICADO CORRECTAMENTE`
                // Aparecera el cofre en este lugar que pedira una clave al usuario para poder abrirlo y aparecera un modal
                texto_felicitaciones.textContent = ``;
                
                viDIV.classList.add('ocultar'); //Ocultar al caja del boton para volver a intentarlo
                cofre.classList.remove('ocultar'); //Mostrar el cofre

                info_CRPCI.classList.add('ocultar');
            } else {
                password_burro.style.color = '';
            }
        }, 1000); // 2000 milisegundos = 2 segundos
    }
});



//Vista numero 1, boton para pasar a la vista 2
btnI.addEventListener('click', () => {

    vI.classList.add('ocultar');
    vII.classList.remove('ocultar');
    // Reproduce o pausa el audio
    // if (miAudio.paused) {
    //     miAudio.play();
    // } else {
    //     miAudio.pause();
    // }
    juego();
});

btn_home.addEventListener('click', ()=>{
    location.reload();
});

btn_home_end.addEventListener('click', ()=>{
    location.reload();
});

function reproducirCancionAleatoria() {
    
    let cancionAleatoria;
    do {
        cancionAleatoria = canciones[Math.floor(Math.random() * canciones.length)];
    } while (cancionAleatoria === cancionAnterior);

    miAudio.src = cancionAleatoria;
    miAudio.play();

    reproduciendo = true;

    // Actualizar el texto del botón
    botonReproducir.innerHTML = '<i class="bi bi-shuffle px-2"></i>Cambiar canción';
    botonReproducir_II.innerHTML = '<i class="bi bi-shuffle px-2"></i>Cambiar canción';

    // Mostrar el nombre de la canción en el span
    spanNombreCancion.innerHTML = `Escuchando: ${obtenerNombreCancion(cancionAleatoria)} <i class="bi bi-music-note-beamed"></i>`;
   
    spanNombreCancion.classList.add('efectoSpan');
    // Agregar un retraso de 2 segundos (2000 milisegundos) antes de quitar la clase
    setTimeout(() => {
        spanNombreCancion.classList.remove('efectoSpan');
    }, 2000);

     // Inicializa el porcentaje en 0 (o cualquier otro valor inicial deseado)
     let porcentajeProgreso = 0;

     // Escucha el evento timeupdate del elemento de audio
     miAudio.addEventListener('timeupdate', () => {
         const tiempoActual = miAudio.currentTime; // Tiempo actual de reproducción en segundos
         const duracionTotal = miAudio.duration; // Duración total de la canción en segundos
 
         // Calcula el porcentaje de progreso
         if (!isNaN(duracionTotal) && duracionTotal > 0) {
             porcentajeProgreso = (tiempoActual / duracionTotal) * 100;
         }
 
         // Actualiza la interfaz de usuario con el porcentaje
        // spanPorcentajeProgreso.innerHTML = `- ${porcentajeProgreso.toFixed(2)}%`;
     });
    // Cuando la canción actual termine, reproducir la siguiente automáticamente
    miAudio.addEventListener('ended', ()=>{
        reproducirCancionAleatoria();
        botonPausar.innerHTML = '<i class="bi bi-pause-fill"></i>Pausar';
        botonPausar_II.innerHTML = '<i class="bi bi-pause-fill"></i>Pausar';
    });

    // Guardar la canción actual como la canción anterior
    cancionAnterior = cancionAleatoria;
}

botonReproducir.addEventListener("click", ()=>{
    
    reproducirCancionAleatoria();
    botonPausar.classList.remove('ocultar');
    botonReproducir.classList.remove('efectR');
    botonPausar.innerHTML = '<i class="bi bi-pause-fill"></i>Pausar';
});

botonReproducir_II.addEventListener("click", ()=>{
    
    reproducirCancionAleatoria();
    botonPausar_II.classList.remove('ocultar');
    botonReproducir_II.classList.remove('efectR');
    botonPausar_II.innerHTML = '<i class="bi bi-pause-fill"></i>Pausar';
});

function pausarCancion() {
    if (reproduciendo) {
        miAudio.pause();
        reproduciendo = false;
        botonPausar.innerHTML = '<i class="bi bi-play-fill"></i>Play';
        botonPausar_II.innerHTML = '<i class="bi bi-play-fill"></i>Play';
        
    } else {
        miAudio.play();
        reproduciendo = true;
        botonPausar.innerHTML = '<i class="bi bi-pause-fill"></i>Pausar';
        botonPausar_II.innerHTML = '<i class="bi bi-pause-fill"></i>Pausar';
    }
}

botonPausar.addEventListener("click", pausarCancion);
botonPausar_II.addEventListener("click", pausarCancion);

function obtenerNombreCancion(rutaCancion) {
    // Extrae el nombre de la canción desde la ruta (por ejemplo, "cancion.mp3")
    const partesRuta = rutaCancion.split("/");
    const nombreCancion = partesRuta[partesRuta.length - 1];
    const nombreSinExtension = nombreCancion.replace(".mp3", "");
    return nombreSinExtension;
}

function juego(){
    
    // Suponiendo que ya tienes una referencia al div con ID 'opc'
    for (let i = 0; i < opc.children.length; i++) {
        // Asegúrate de que el índice 'i' esté dentro del rango del arreglo 'opciones'
        if (i < data[sp].opciones.length) {
            preguntas.textContent = data[sp].pregunta;
            opc.children[i].textContent = data[sp].opciones[i];
            LE = '';
            LEO = '';

            if (sp === 1) {
                LE = data[sp].pregunta.charAt(16); // Por ejemplo, la letra 'r'

            } else if (sp === 2) {
                LE = data[sp].pregunta.charAt(4); // Por ejemplo, la letra 'e'

                LEO = data[sp].opciones[1].charAt(4); // Por ejemplo, la letra 'g'
                TextRO = data[sp].opciones[1].replace(LEO, `<b>${LEO}</b>`);
                opc.children[1].innerHTML = TextRO;

            } else if (sp === 3) {

                LEO = data[sp].opciones[3].charAt(20); // Por ejemplo, la letra 'i'
                TextRO = data[sp].opciones[3].replace(LEO, `<b>${LEO}</b>`);
                opc.children[3].innerHTML = TextRO;
            } else if (sp === 8) {
                LE = data[sp].pregunta.charAt(17); // Por ejemplo, la letra 'l'
            } else if (sp == 9) {
                LE = data[sp].pregunta.charAt(19); // Por ejemplo, la letra 'l'
            }

            // Crea una versión del texto con la letra resaltada
            TextR = data[sp].pregunta.replace(LE, `<b>${LE}</b>`);
            preguntas.innerHTML = TextR;

            opc.children[i].style.color = '';
            opc.children[i].style.backgroundColor = ''; // Quitar el fondo
            opc.children[i].disabled = false; // Habilitar el botón
        }
    }

    //Recorre la imagen segun la pregunta
    imagenes.forEach(function(imagen) {
        if(imagen === imagenes[sp]){
            imagen.classList.remove('ocultar');
        } else {
            imagen.classList.add('ocultar');
            }
    });
}

// Agregar el evento 'click' al div 'opc' fuera del bucle for
opc.addEventListener('click', (event) => {
    // Usar 'event.target' para obtener el elemento hijo que fue clickeado
    let elementoClickeado = event.target;

    // Verificar si el elemento clickeado es uno de los hijos directos de 'opc'
    if (elementoClickeado.parentNode === opc) {
        barraDeProgreso(contadorBDP++);
        
        // Verificar si el contenido del elemento clickeado es la respuesta correcta
        if (elementoClickeado.textContent === data[sp].respuesta) {
            elementoClickeado.style.color = '#ffff'; // Color blanca la opcion al seleccionar
            elementoClickeado.style.backgroundColor = 'green';
        } else {
            elementoClickeado.style.backgroundColor = 'red';
            elementoClickeado.style.color = '#ffff'; // Color blanca la opcion al seleccionar
            r--;
        }

        // Deshabilitar todos los elementos hijos de 'opc'
        for (let j = 0; j < opc.children.length; j++) {
            opc.children[j].disabled = true;
        }

        // Mostrar el botón 'btnSP'
        btnSP.classList.remove('ocultar');

        // Este if es para saber si ya se llego a la ultima pregunta
        if(sp === 9){
            btnSP.classList.add('ocultar'); // ocultar el botón de siguiente pregunta
            btnII.classList.remove('ocultar'); // Mostrar el botón de ver resultados
        }
    }
});

btnSP.addEventListener('click', () =>{
    juego(sp++);
    btnSP.classList.add('ocultar');
});

// funciona para controlar la barra de progreso
function barraDeProgreso() {
    tp = 10; // Total de preguntas en el quiz
    pp = (contadorBDP / tp) * 100;
    BDP.style.width = pp + '%';
    
    //Barra en porcetaje agregando math
    // BDP.style.width = Math.floor(porcentajeProgreso) + '%';

    // BDP.textContent = `${Math.floor(porcentajeProgreso)}%`;
    
}
// Guarda el estado de la vista en localStorage antes de recargar
document.addEventListener('DOMContentLoaded', () => {
    guardaVista = localStorage.getItem('vista');
    // Si la vista guardada es 'secundaria', mostrar la vista secundaria
    if (guardaVista === 'secundaria') {
        vI.classList.add('ocultar');
        vII.classList.remove('ocultar');
        // Opcional: limpiar el estado de localStorage si ya no es necesario
        localStorage.removeItem('vista');
        juego();
    }
});

// Agregar un evento para reiniciar las preguntas y cambiar la vista
reiniciar_preguntas.addEventListener('click', () => {
    // Guardar el estado en localStorage antes de recargar
    localStorage.setItem('vista', 'secundaria');
    // Recargar la página
    location.reload();
});

//Vista numero 2, boton para pasar a la vista 3
btnII.addEventListener('click', () => {
    vIII.classList.remove('ocultar');
    vII.classList.add('ocultar');

    resultados_correctos.textContent = `${r}`;
    resultados_incorrectos.textContent = `${10 - r}`;

    if(r === 10){
        texto_calificacion.classList.remove('ocultar');
        // Aparecera el cofre en este lugar que pedira una clave al usuario para poder abrirlo y aparecera un modal
        texto_felicitaciones.textContent = `¡TEXTO DE FELICITACIONES!`;

        viDIV.classList.add('ocultar'); //Ocultar al caja del boton para volver a intentarlo
        cofre.classList.remove('ocultar'); //Mostrar el cofre
        codigo_100000.classList.remove('ocultar');
    } else {
        texto_calificacion.classList.add('ocultar');

        // Boton para volver a intentarlo
        btnvi.addEventListener('click', () => {
            // Guardar el estado en localStorage antes de recargar
            localStorage.setItem('vista', 'secundaria');
            // Recargar la página
            location.reload();
        });
    }
});

//Letras secretas del cofre

letras_secretas.addEventListener('input', function() {
    const letrasSecretas = "nombre1";
    const codigoIngresado = this.value.toLowerCase(); // Elimina caracteres no numéricos
    
    if (codigoIngresado.length === 7) {
        if (codigoIngresado === letrasSecretas) {
            letras_secretas.style.color = '#07cc00';
        } else {
            letras_secretas.style.color = '#cc0000'; // Restaura el color original
        }
        setTimeout(function() {
            if (codigoIngresado === letrasSecretas) {
                this.value = '';
                modal_cofre.style.display = 'none';
                document.querySelector('.modal-backdrop').remove(); // Elimina la capa de fondo
                this.value = ''; // Borra el contenido del campo
                // Redirige a la página "awards.html"
                
                // En la segunda ventana (antes de actualizar)
                const miObjeto = { dato: 'validation' };
                sessionStorage.setItem('miDato', JSON.stringify(miObjeto));

                window.location.href = 'awards.html';
                    
            } else {
                letras_secretas.style.color = '';
                    
            }
        }, 1000); // 1000 milisegundos = 1 segundos
    }
});