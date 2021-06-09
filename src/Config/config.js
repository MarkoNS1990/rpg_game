import Phaser from 'phaser';
import BootScene from '../Scenes/BootScene';
import GameScene from '../Scenes/GameScene';

export default {
  type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};
