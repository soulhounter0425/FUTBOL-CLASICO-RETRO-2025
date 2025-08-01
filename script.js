// script.js

// === LÓGICA DEL MENÚ PRINCIPAL ===
const opciones = document.querySelectorAll(".menu-item");

opciones.forEach((opcion, index) => {
  opcion.addEventListener("click", () => {
    switch (index) {
      case 0: // Partido de Exhibición
        window.location.href = "html/partido_exhibicion.html";
        break;
      case 1: // Liga
        alert("Modo Liga aún no disponible.");
        break;
      case 2: // Copa
        alert("Modo Copa aún no disponible.");
        break;
      case 3: // Entrenamiento
        alert("Modo Entrenamiento aún no disponible.");
        break;
      case 4: // Modo Edición
        alert("Modo Edición aún no disponible.");
        break;
      case 5: // Opciones
        alert("Opciones aún no implementadas.");
        break;
      case 6: // Salir
        window.location.href = "index.html"; // Regresa a la intro
        break;
      default:
        console.warn("Opción no reconocida en menú.");
    }
  });
});

// === VARIABLES DEL PARTIDO ===

// Marcador (arranca en 0, cambia cuando quieras)
let scoreBrasil = 0;
let scoreArgentina = 0;

// Tiempo en segundos (empieza desde 0 y sube)
let segundos = 0;
let tiempoSet = "2T"; // Puedes cambiarlo a "1T" o lo que quieras

// Posición inicial del balón (centro cancha)
let posX = 400;
let posY = 225;

// Referencia al balón en el DOM
const balon = document.querySelector('.balon');

// === FUNCIONES ===

// Actualiza el marcador en pantalla
function actualizarMarcador() {
  const scoreBrasilElem = document.getElementById('score-brasil');
  const scoreArgentinaElem = document.getElementById('score-argentina');
  if (scoreBrasilElem && scoreArgentinaElem) {
    scoreBrasilElem.textContent = scoreBrasil;
    scoreArgentinaElem.textContent = scoreArgentina;
  }
}

// Convierte segundos a formato "minutos:segundos"
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const seg = seconds % 60;
  return `${min}:${seg.toString().padStart(2, '0')}`;
}

// Actualiza el tiempo en pantalla
function actualizarTiempo() {
  segundos++;
  const tiempoElem = document.getElementById('match-time');
  if (tiempoElem) {
    tiempoElem.textContent = `MIN: ${formatTime(segundos)} ${tiempoSet}`;
  }
}

// Mueve el balón según teclas WASD
function moverBalon(e) {
  const step = 10;
  switch (e.key.toLowerCase()) {
    case 'w': posY -= step; break;
    case 'a': posX -= step; break;
    case 's': posY += step; break;
    case 'd': posX += step; break;
    default: return; // Ignorar otras teclas
  }

  // Limita movimiento dentro de la cancha (800x450)
  posX = Math.min(Math.max(posX, 0), 800);
  posY = Math.min(Math.max(posY, 0), 450);

  // Actualiza posición visual del balón
  if (balon) {
    balon.style.left = posX + 'px';
    balon.style.top = posY + 'px';
  }
}

// === EVENTOS ===

// Escucha el teclado para mover balón
document.addEventListener('keydown', moverBalon);

// Actualiza tiempo y marcador cada segundo
setInterval(() => {
  actualizarTiempo();
  actualizarMarcador();
}, 1000);

// Inicializa marcador y tiempo al cargar
window.addEventListener('DOMContentLoaded', () => {
  actualizarMarcador();
  actualizarTiempo();

  // Inicializa posición del balón
  if (balon) {
    balon.style.left = posX + 'px';
    balon.style.top = posY + 'px';
  }
});

