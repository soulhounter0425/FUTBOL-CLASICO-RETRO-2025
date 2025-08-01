// ==================== VARIABLES ====================
let jugadorX = 100;
let jugadorY = 200;
let jugador2X = 600;
let jugador2Y = 200;
let balonX = 130;
let balonY = 220;
let velX = 0;
let velY = 0;
let pegado = true;
const velocidad = 5;
const teclas = {};

const jugadorBrasil = document.getElementById("jugador-brasil");
const jugadorArgentina = document.getElementById("jugador-argentina");
const balon = document.querySelector(".balon");
const audioGol = document.getElementById("audio-gol");

let scoreLocal = 0;
let scoreVisitante = 0;
let segundos = 0;
let tiempoSet = '1T';
let golEnProceso = false;

// ==================== TIEMPO ====================
function formatTime(seg) {
  const min = Math.floor(seg / 60);
  return `${min}:${(seg % 60).toString().padStart(2, '0')}`;
}

setInterval(() => {
  segundos++;
  if (segundos >= 45 * 60 && tiempoSet === '1T') {
    tiempoSet = '2T';
    segundos = 0;
  }
  document.getElementById('match-time').textContent = `MIN: ${formatTime(segundos)} ${tiempoSet}`;
}, 1000);

function actualizarMarcador() {
  document.getElementById('score-local').textContent = scoreLocal;
  document.getElementById('score-visitante').textContent = scoreVisitante;
}

// ==================== GOLES ====================
function checkGol(posX, posY) {
  if (golEnProceso) return;

  if (posX <= 10 && posY >= 170 && posY <= 280) {
    golEnProceso = true;
    scoreVisitante++;
    audioGol.play();
    actualizarMarcador();
    setTimeout(() => {
      resetBalon();
      golEnProceso = false;
    }, 1500);
  } else if (posX >= 736 && posY >= 170 && posY <= 280) {
    golEnProceso = true;
    scoreLocal++;
    audioGol.play();
    actualizarMarcador();
    setTimeout(() => {
      resetBalon();
      golEnProceso = false;
    }, 1500);
  }
}

// ==================== CONTROLES ====================
document.addEventListener("keydown", (e) => {
  teclas[e.key.toLowerCase()] = true;
  if (e.key === " ") disparar();
});

document.addEventListener("keyup", (e) => {
  teclas[e.key.toLowerCase()] = false;
});

// ==================== MOVIMIENTO ====================
function moverJugador() {
  if (teclas["w"]) jugadorY -= velocidad;
  if (teclas["s"]) jugadorY += velocidad;
  if (teclas["a"]) jugadorX -= velocidad;
  if (teclas["d"]) jugadorX += velocidad;
}

function moverJugador2() {
  if (teclas["arrowup"]) jugador2Y -= velocidad;
  if (teclas["arrowdown"]) jugador2Y += velocidad;
  if (teclas["arrowleft"]) jugador2X -= velocidad;
  if (teclas["arrowright"]) jugador2X += velocidad;
}

function disparar() {
  if (pegado) {
    velX = 10;
    velY = -2;
    pegado = false;
    jugadorBrasil.style.backgroundImage = "url('assets/sprites/Brasil/shoot.png')";
    setTimeout(() => {
      jugadorBrasil.style.backgroundImage = "url('assets/sprites/Brasil/run.png')";
    }, 300);
  }
}

function moverBalon() {
  if (pegado) {
    balonX = jugadorX + 30;
    balonY = jugadorY + 20;
  } else {
    balonX += velX;
    balonY += velY;
    velX *= 0.95;
    velY *= 0.95;

    if (Math.abs(velX) < 0.1 && Math.abs(velY) < 0.1) {
      velX = 0;
      velY = 0;
    }

    if (
      Math.abs(balonX - jugadorX) < 30 &&
      Math.abs(balonY - jugadorY) < 30 &&
      velX === 0 &&
      velY === 0
    ) {
      pegado = true;
    }

    checkGol(balonX, balonY);
  }
}

function dibujar() {
  jugadorBrasil.style.left = `${jugadorX}px`;
  jugadorBrasil.style.top = `${jugadorY}px`;
  jugadorArgentina.style.left = `${jugador2X}px`;
  jugadorArgentina.style.top = `${jugador2Y}px`;
  balon.style.left = `${balonX}px`;
  balon.style.top = `${balonY}px`;
}

function resetBalon() {
  velX = 0;
  velY = 0;
  pegado = true;
  jugadorX = 100;
  jugadorY = 200;
  balonX = 130;
  balonY = 220;
}

function bucle() {
  moverJugador();
  moverJugador2();
  moverBalon();
  dibujar();
  requestAnimationFrame(bucle);
}

actualizarMarcador();
window.onload = bucle;



