import Phaser from 'phaser';
import logoImg from '../../assets/logo.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });

    const tiles = map.addTilesetImage('spritesheet', 'tiles');
        
	  const grass = map.createStaticLayer('Grass', tiles, 0, 0);
        const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(50, 100, 'player', 6)    
  }
}
