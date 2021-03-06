﻿/// <reference path="phaser.d.ts"/>
class SimpleGame {
    game: Phaser.Game;
    map: Phaser.Tilemap;
    layer: Phaser.TilemapLayer;
    player: Phaser.Sprite;
    
    constructor() {
        this.game = new Phaser.Game(640, 480, Phaser.AUTO, 'content', {
            create: this.create, preload:
            this.preload,update:this.update, render: this.render
        });
    }
    preload() {
        this.game.load.tilemap("ItsTheMap", "map.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image("Tiles", "castle_0.png");
        this.game.load.image("Decepticon", "decepticonLarge.png");
    }
    update() {
        // You actually need to perform the collision test between the map and player sprite
        this.game.physics.arcade.collide(this.player, this.layer);
    }
    render() {
        // Display the outline of the physics body
        this.game.debug.body(this.player);
    }
    create() {
        // Enable the physics system in Phaser
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.map = this.game.add.tilemap("ItsTheMap", 32, 32, 50, 20);
        this.map.addTilesetImage("castle_0", "Tiles");

        this.map.createLayer("Background").resizeWorld();
        this.layer = this.map.createLayer("Midground");
        this.map.createLayer("Foreground");

        this.player = new Phaser.Sprite(this.game, 200, 40, "Decepticon");
        // Apply physics to our game sprite
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        // Turn on gravity.  10pixels / second along the y axis
        this.player.body.gravity.y = 10;
        this.player.body.collideWorldBounds = true;

        // Now setup the tiles in our midground layer for collisions
        // When using multiple layers it is critical you specify the layer the collisions occur on!
        this.map.setCollisionBetween(32, 36,true,this.layer.index,true);
        

        this.game.world.addAt(this.player, 3);

        // Add a keyboard handler on 'R' pressed the resets the sprite to it's starting position
        this.game.input.keyboard.addKey(Phaser.Keyboard.R).onUp.add(() => {
            this.player.position.set(200, 40);
        });
    }
}

window.onload = () => {
    var game = new SimpleGame();
};
