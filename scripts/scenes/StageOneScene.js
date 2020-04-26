/**
 * The Scene for prototype
 * 2020/04/23
 * Chanhee Jang
 */
import createRectangle from '../sprites/Rectangle.js';
import GameObjectController from "../controllers/CharacterController.js";
import invokeDebug from '../debugs/DebugScene.js';
import PatternManager from '../patterns/PatternManager.js';


export default class StageOneScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.rect = null;
        this.g_obj_conroller = null;
        this.xV = null;
        this.yV = null;
    }

    preload() {
        this.load.image("sky", "http://127.0.0.1:8080/resources/backgrounds/dark_night_sky.jpg");
        this.load.image("bg-2", "http://127.0.0.1:8080/resources/backgrounds/bg-2.png");
    }

    create() {
        this.add.image(640, 360, "sky");

        this.rectChar = createRectangle(this, 400, 720, 50, 50);
        this.physics.add.existing(this.rectChar);
        this.rectChar.body.setCollideWorldBounds(true, 0, 0);
        this.rectChar.body.gravity.y = 1000;
        this.g_obj_conroller = new GameObjectController(this, this.rectChar);

        // Debug Button to enter start scene
        invokeDebug(this);

        this.pattern = new PatternManager(this, this.rectChar);
        this.o_group = this.pattern.getPattern2();
        let a = this.add.group(this.o_group);
        console.log(a);

    }
    update() {
        // this.pattern.pattern2CollideControl(this.o_group);
    }
}