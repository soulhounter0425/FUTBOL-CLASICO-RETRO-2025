// MenuPrincipal.js - Escena principal con Phaser y selección de equipos

export default class MenuPrincipal extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuPrincipal' });
  }

  preload() {
    this.load.image('fondo', 'assets/fondo_menu.png');
  }

  create() {
    this.add.image(0, 0, 'fondo')
      .setOrigin(0)
      .setDisplaySize(this.scale.width, this.scale.height);

    this.add.text(this.scale.width / 2, 80, 'FÚTBOL RETRO 25', {
      fontFamily: '"Press Start 2P", Arial',
      fontSize: '24px',
      fill: '#FFD700',
      stroke: '#000',
      strokeThickness: 6
    }).setOrigin(0.5).setShadow(3, 3, '#000', 4, true, true);

    this.add.text(this.scale.width / 2, 130, 'PULSE START', {
      fontFamily: '"Press Start 2P", Arial',
      fontSize: '16px',
      fill: '#FFFFFF',
      stroke: '#000',
      strokeThickness: 4
    }).setOrigin(0.5).setShadow(2, 2, '#000', 4, true, true);

    const opciones = ['Partido de Exhibición', 'Liga', 'Copa', 'Entrenamiento', 'Modo Edición', 'Opciones', 'Salir'];
    let seleccion = 0;

    const textos = opciones.map((opcion, i) => {
      const texto = this.add.text(100, 200 + i * 40, opcion, {
        fontFamily: '"Press Start 2P", Arial',
        fontSize: '12px',
        fill: i === seleccion ? '#FFD700' : '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 4
      });
      texto.setShadow(2, 2, '#000', 3, true, true);
      return texto;
    });

    this.input.keyboard.on('keydown-UP', () => {
      seleccion = (seleccion - 1 + opciones.length) % opciones.length;
      actualizarSeleccion();
    });

    this.input.keyboard.on('keydown-DOWN', () => {
      seleccion = (seleccion + 1) % opciones.length;
      actualizarSeleccion();
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      switch (seleccion) {
        case 0:
          localStorage.setItem("equipoLocal", "Brasil");
          localStorage.setItem("equipoVisitante", "España");
          this.scene.start('PartidoExhibicion');
          break;
        case 6:
          window.location.href = "index.html";
          break;
        default:
          alert("Este modo aún no está disponible.");
      }
    });

    function actualizarSeleccion() {
      textos.forEach((texto, i) => {
        texto.setColor(i === seleccion ? '#FFD700' : '#FFFFFF');
      });
    }
  }
}

