import Phaser from 'phaser';
import PlayerCharacter from '../Objects/PlayerCharacter';
import Enemy from '../Objects/Enemy';
import { getPlayerScore, updateScoreText } from '../Score/PlayerScore';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create()
  {
    // change the background to green
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
    let scoreText = this.add.text(16, 16, `score: ${getPlayerScore()}`, {
        fontSize: '16px',
        fill: '#fff',
      });
      updateScoreText(scoreText);

    // Add dark Box
    this.add.rectangle(410, 300, 400, 350, 0x000000).setAlpha(0.9);  
    this.startBattle();
    // on wake event we call startBattle too
    this.sys.events.on('wake', this.startBattle, this);
    	
    
  }

  nextTurn() {  
    // if we have victory or game over
    if(this.checkEndBattle()) {           
        this.endBattle();
        return;
    }
    do {
        // currently active unit
        this.index++;
        // if there are no more units, we start again from the first one
        if(this.index >= this.units.length) {
            this.index = 0;
        }            
    } while(!this.units[this.index].living);
    // if its player hero
    if(this.units[this.index] instanceof PlayerCharacter) {
        // we need the player to select action and then enemy
        this.events.emit("PlayerSelect", this.index);
    } else { // else if its enemy unit
        // pick random living hero to be attacked
        let r;
        do {
            r = Math.floor(Math.random() * this.heroes.length);
        } while(!this.heroes[r].living) 
        // call the enemy's attack function 
        this.units[this.index].attack(this.heroes[r]);  
        // add timer for the next turn, so will have smooth gameplay
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    }
}
    startBattle() {
    // player character - warrior
    const warrior = new PlayerCharacter(this, 380, 150, "player", 1, "Warrior", 100, 100);        
    this.add.existing(warrior);
    
    // player character - mage
    const mage = new PlayerCharacter(this, 380, 200, "player", 4, "Mage", 80, 100);
    this.add.existing(mage);            
    
    const dragonblue = new Enemy(this, 440, 150, "dragonblue", null, "Dragon", 50, 3);
    this.add.existing(dragonblue);
    
    const dragonOrange = new Enemy(this, 440, 200, "dragonorrange", null,"Dragon2", 50, 3);
    this.add.existing(dragonOrange);
    
    // array with heroes
    this.heroes = [ warrior, mage ];
    // array with enemies
    this.enemies = [ dragonblue, dragonOrange ];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);
    
    this.index = -1; // currently active unit
    
    this.scene.run("UIScene");        
}

    receivePlayerSelection(action1, target1) {
        if(action1 == 'attack') {            
            this.units[this.index].attack(this.enemies[target1]);              
        }
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });        
    }
    exitBattle() {
        this.scene.sleep('UIScene');
        this.scene.switch('Game');
    }

    
    checkEndBattle() {        
        let victory = true;
        // if all enemies are dead we have victory
        for(let i = 0; i < this.enemies.length; i++) {
            if(this.enemies[i].living)
                victory = false;
        }
        let gameOver = true;
        // if all heroes are dead we have game over
        for(let i = 0; i < this.heroes.length; i++) {
            if(this.heroes[i].living)
                gameOver = false;
        }
        return victory || gameOver;
    }

    endBattle() {       
        // clear state, remove sprites
        this.heroes.length = 0;
        this.enemies.length = 0;
        for(var i = 0; i < this.units.length; i++) {
            // link item
            this.units[i].destroy();            
        }
        this.units.length = 0;
        // sleep the UI
        this.scene.sleep('UIScene');
        // return to WorldScene and sleep current BattleScene
        this.scene.switch('Game');
    }
}