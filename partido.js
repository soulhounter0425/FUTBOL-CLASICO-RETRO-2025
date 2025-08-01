window.onload = () => {
  const local = "Brasil";
  const visitante = "Argentina";

  document.getElementById('equipo-local').textContent = local.toUpperCase();
  document.getElementById('equipo-visitante').textContent = visitante.toUpperCase();
  document.getElementById('escudo-local').src = "assets/img/escudos/Brasil.png";
  document.getElementById('escudo-visitante').src = "assets/img/escudos/Argentina.png";

  const jugadorSprite = new Image();
  jugadorSprite.src = "assets/sprites/Brasil/BRASIL.png";
  const rivalSprite = new Image();
  rivalSprite.src = "assets/sprites/Argentina/ARGENTINA.png";
  const balon = new Image();
  balon.src = "assets/sprites/balon/balon.png";

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  let jugador = { x: 100, y: 200, ancho: 48, alto: 64 };
  let rival = { x: 600, y: 200, ancho: 48, alto: 64 };

  let balonX = jugador.x + 20, balonY = jugador.y + 40;
  let balonVelX = 0, balonVelY = 0;
  let controlBalon = true;

  let ultimaDireccionJugador = { x: 1, y: 0 };
  let ultimaDireccionRival = { x: -1, y: 0 };

  let scoreLocal = 0, scoreVisitante = 0;
  let segundos = 0, tiempoSet = '1T', partidoEnJuego = true, mostrarLetreroGol = false;

  const audioGol = document.getElementById('audio-gol');
  const keys = {};

  let golEnProceso = false;

  document.addEventListener('keydown', e => {
    keys[e.key] = true;
    updateDirection();

    if (e.code === "Space" && jugadorCercaDelBalon(rival)) {
      shootBall(ultimaDireccionRival);
    }

    if ((e.key === '0' || e.code === "Digit0" || e.code === "Numpad0") && jugadorCercaDelBalon(jugador)) {
      shootBall(ultimaDireccionJugador);
    }
  });

  document.addEventListener('keyup', e => { keys[e.key] = false; });

  function updateDirection() {
    let dx = 0, dy = 0;
    if (keys['w']) dy -= 1;
    if (keys['s']) dy += 1;
    if (keys['a']) dx -= 1;
    if (keys['d']) dx += 1;
    if (dx || dy) {
      const mag = Math.sqrt(dx * dx + dy * dy);
      ultimaDireccionRival = { x: dx / mag, y: dy / mag };
    }

    dx = 0; dy = 0;
    if (keys['ArrowUp']) dy -= 1;
    if (keys['ArrowDown']) dy += 1;
    if (keys['ArrowLeft']) dx -= 1;
    if (keys['ArrowRight']) dx += 1;
    if (dx || dy) {
      const mag = Math.sqrt(dx * dx + dy * dy);
      ultimaDireccionJugador = { x: dx / mag, y: dy / mag };
    }
  }

  function moverJugador(player, keys, esquema) {
    const v = 3;
    if (esquema === 'jugador') {
      if (keys['ArrowUp']) player.y -= v;
      if (keys['ArrowDown']) player.y += v;
      if (keys['ArrowLeft']) player.x -= v;
      if (keys['ArrowRight']) player.x += v;
    } else {
      if (keys['w']) player.y -= v;
      if (keys['s']) player.y += v;
      if (keys['a']) player.x -= v;
      if (keys['d']) player.x += v;
    }

    player.x = Math.max(0, Math.min(canvas.width - player.ancho, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.alto, player.y));
  }

  function jugadorCercaDelBalon(player) {
    const cx = player.x + player.ancho / 2;
    const cy = player.y + player.alto / 2;
    const bx = balonX + 12;
    const by = balonY + 12;
    return Math.hypot(cx - bx, cy - by) < 40;
  }

  function shootBall(direction) {
    const fuerza = 13;
    const mag = Math.sqrt(direction.x ** 2 + direction.y ** 2) || 1;
    balonVelX = (direction.x / mag) * fuerza;
    balonVelY = (direction.y / mag) * fuerza;
    controlBalon = false;
  }

  function actualizarBalon() {
    const balonAncho = 24, balonAlto = 24;
    let jugadorConControl = null;

    if (jugadorCercaDelBalon(jugador) && controlBalon) {
      jugadorConControl = jugador;
    } else if (jugadorCercaDelBalon(rival) && controlBalon) {
      jugadorConControl = rival;
    }

    if (jugadorConControl) {
      balonX = jugadorConControl.x + jugadorConControl.ancho / 2 - balonAncho / 2;
      balonY = jugadorConControl.y + jugadorConControl.alto / 2 - balonAlto / 2;
      balonVelX = 0;
      balonVelY = 0;
    } else {
      balonX += balonVelX;
      balonY += balonVelY;
      balonVelX *= 0.96;
      balonVelY *= 0.96;
      if (Math.abs(balonVelX) < 0.05) balonVelX = 0;
      if (Math.abs(balonVelY) < 0.05) balonVelY = 0;

      if (balonVelX === 0 && balonVelY === 0) controlBalon = true;
    }

    balonX = Math.max(0, Math.min(canvas.width - balonAncho, balonX));
    balonY = Math.max(0, Math.min(canvas.height - balonAlto, balonY));

    checkGol(balonX, balonY);
  }

  function checkGol(posX, posY) {
    if (!partidoEnJuego || golEnProceso) return;

    if (posX <= 10 && posY >= 170 && posY <= 280) {
      golEnProceso = true;
      scoreVisitante++;
      manejarGol();
    } else if (posX >= 736 && posY >= 170 && posY <= 280) {
      golEnProceso = true;
      scoreLocal++;
      manejarGol();
    }
  }

  function manejarGol() {
    audioGol.play();
    actualizarMarcador();
    mostrarAnuncioGol();
    setTimeout(() => {
      resetBalon();
      golEnProceso = false;
    }, 1500);
  }

  function mostrarAnuncioGol() {
    const anuncio = document.getElementById('anuncio-gol');
    anuncio.style.display = 'block';
    setTimeout(() => { anuncio.style.display = 'none'; }, 1500);
  }

  function resetBalon() {
    balonVelX = 0;
    balonVelY = 0;
    controlBalon = true;
    jugador.x = 100;
    jugador.y = 200;
    rival.x = 600;
    rival.y = 200;
    balonX = jugador.x + 20;
    balonY = jugador.y + 40;
    ultimaDireccionJugador = { x: 1, y: 0 };
    ultimaDireccionRival = { x: -1, y: 0 };
    partidoEnJuego = true;
  }

  function actualizarMarcador() {
    document.getElementById('score-local').textContent = scoreLocal;
    document.getElementById('score-visitante').textContent = scoreVisitante;
  }

  function formatTime(seg) {
    const min = Math.floor(seg / 60);
    const sec = (seg % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

  function obtenerPuntajeFinal() {
    return scoreLocal + scoreVisitante;
  }

  setInterval(() => {
    segundos++;

    if (tiempoSet === '1T' && segundos >= 300) {
      tiempoSet = '2T';
      segundos = 0;
    } else if (tiempoSet === '2T' && segundos >= 300 && partidoEnJuego) {
      partidoEnJuego = false;
      let puntajeFinal = obtenerPuntajeFinal();
      guardarPuntaje(puntajeFinal);
      console.log("Partido finalizado. Puntaje enviado:", puntajeFinal);
    }

    document.getElementById('match-time').textContent = `MIN: ${formatTime(segundos)} ${tiempoSet}`;
  }, 1000);

  let imagesLoaded = 0;
  const totalImages = 3;
  const onImageLoad = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) draw();
  };
  jugadorSprite.onload = onImageLoad;
  rivalSprite.onload = onImageLoad;
  balon.onload = onImageLoad;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moverJugador(jugador, keys, 'jugador');
    moverJugador(rival, keys, 'rival');
    actualizarBalon();
    ctx.drawImage(jugadorSprite, jugador.x, jugador.y, jugador.ancho, jugador.alto);
    ctx.drawImage(rivalSprite, rival.x, rival.y, rival.ancho, rival.alto);
    ctx.drawImage(balon, balonX, balonY, 24, 24);

    requestAnimationFrame(draw);
  }
};

function guardarPuntaje(puntajeFinal) {
  fetch("controllers/guardarPartida.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "puntaje=" + encodeURIComponent(puntajeFinal)
  })
  .then(response => {
    if (response.ok) {
      console.log("Puntaje guardado correctamente");
    } else {
      console.error("Error al guardar el puntaje");
    }
  })
  .catch(error => {
    console.error("Error en la conexión con el servidor:", error);
  });
}








