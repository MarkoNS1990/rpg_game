/* eslint-disable no-undef */

const MenuItem = new Phaser.Class({
  Extends: Phaser.GameObjects.Text,

  initialize: function MenuItem(x, y, text, scene) {
    Phaser.GameObjects.Text.call(this, scene, x, y, text, {
      color: '#ffffff',
      align: 'left',
      fontSize: 15,
    });
  },

  select() {
    this.setColor('#f8ff38');
  },

  deselect() {
    this.setColor('#ffffff');
  },
  // when the associated enemy or player unit is killed
  unitKilled() {
    this.active = false;
    this.visible = false;
  },
});

export default MenuItem;
