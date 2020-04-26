/**
 * The Scene for prototype
 * 2020/04/23
 * Chanhee Jang
 */
import createRectangle from '../sprites/Rectangle.js';
import GameObjectController from "../controllers/CharacterController.js";
import invokeDebug from '../debugs/DebugScene.js';
import StageOneManager from '../stages/StageOneManager.js';

export default class StageOneScene extends Phaser.Scene {
    constructor(config) {
        super(config);
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


        this.patternNums = [1, 3, 2, 7, 9, 3, 8, 1, 2, 3, 1, 3, 2, 7, 9, 3, 8, 1, 2, 3];

        this.stageManager = new StageOneManager(this, this.rectChar);
        this.stageManager.createPatternGroup(this.patternNums);

        // Time event for set to obstacles
        this.time.addEvent({
            delay: 2500,
            repeat: this.stageManager.patternLength() - 1,
            callback: this.stageManager.moveFirstPattern,
            callbackScope: this.stageManager,
            startAt: 500,
        });

        // Debug Button to enter start scene
        invokeDebug(this);

        this.fps = this.add.text(100, 80, "", { fontSize: '30px' });
    }

    update() {
        this.fps.setText(this.physics.world.fps);
        this.stageManager.collidePatterns();
    }
}