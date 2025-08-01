import MenuPrincipal from './menu.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#000000',
  scene: [MenuPrincipal],
};

new Phaser.Game(config);


  

  