class EscenaInicio extends Phaser.Scene {
    constructor() {
      super('EscenaInicio');
    }
  
    preload() {
      this.load.audio('intro', 'assets/audio/intro.mp3');
      this.load.image('fondo', 'assets/img/competencias/fondo_de_inicio.png');
      this.load.image('logo', 'assets/img/competencias/logo.png');
    }
  
    create() {
      this.sound.play('intro');
      this.add.image(400, 300, 'fondo');
      const logo = this.add.image(400, 100, 'logo');
  
      this.time.delayedCall(3000, () => {
        this.scene.start('MenuPrincipal');
      });
    }
  }
  