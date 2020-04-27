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
        this.physics.world.setBounds(-50, 0, 1380, 720, true, false, true, true);
        this.physics.world.setFPS(660);
        this.rectChar = createRectangle(this, 400, 720, 50, 50);


        this.physics.add.existing(this.rectChar);
        this.rectChar.body.setCollideWorldBounds(true, 0, 0);
        this.rectChar.body.gravity.y = 1000;
        this.g_obj_conroller = new GameObjectController(this, this.rectChar);
        this.rectChar.body.onWorldBounds = true;


        this.patternNums = [1, 3, 2, 7, 9, 3, 8, 1, 2, 3, 1, 3, 2, 7, 9, 3, 8, 1, 2, 3];
        this.patternNums2 = [1, 3, 2, 7, 9];
        this.patternNums3 = [0];
        this.stageManager = new StageOneManager(this, this.rectChar);
        this.stageManager.createPatternGroup(this.patternNums2);
        this.physics.world.on('worldbounds', function (body, up, down, left, right) {
            if (left) {
                body.gameObject.removeAllListeners();
                body.gameObject.setActive(false);
                body.gameObject.setVisible(false);
                body.destroy();
                this.stageManager.containsAndRemove(body.gameObject);
            }
        }, this);

        this.physics.world.on('overlap', function (obj1, obj2, body1, body2) {
            console.log("호에에 호에에");
        });

        // Setting Obstacles with Time Events.
        this.eventArgs = [-500];

        this.time.addEvent({
            delay: 2000,
            repeat: this.stageManager.patternLength() - 1,
            callback: this.stageManager.moveFirstPattern,
            callbackScope: this.stageManager,
            args: this.eventArgs,
            startAt: 0,
        });


        // Debug Button to enter a start scene
        invokeDebug(this);
        this.fps = this.add.text(100, 80, "", { fontSize: '30px' });
    }

    update() {
        this.fps.setText([this.game.getTime(), this.game.getFrame()]);
        this.stageManager.overlapCharacterAndPattern();
        // this.stageManager.overlapCharacterAndTicket();
    }
}