const canvas = document.getElementById('cancha');
const ctx = canvas.getContext('2d');
const anchoFrame = 64;
const altoFrame = 64;
let tick = 0;

function dibujarJugador(jugador) {
  const sprite = jugador.sprites[jugador.anim];
  if (!sprite.complete) return;

  const frameActual = jugador.frame % 9;
  ctx.drawImage(
    sprite,
    frameActual * anchoFrame, 0,
    anchoFrame, altoFrame,
    jugador.x, jugador.y,
    anchoFrame, altoFrame
  );
}

function actualizar() {
  tick++;
  if (tick % 10 === 0) {
    jugadorBrasil.frame++;
  }
}

function bucle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  actualizar();
  dibujarJugador(jugadorBrasil);
  requestAnimationFrame(bucle);
}

bucle();
