/**
 * All Stage class(without main, end scenes) must has inheritance to this class
 * 2020/04/29
 * Chanhee Jang 
 */
import createRectangle from '../sprites/Rectangle.js';
import GameObjectController from "../controllers/CharacterController.js";
import invokeDebug from '../debugs/DebugScene.js';
import StageManager from '../stages/StageManager.js';


export default class StageParent extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {

    }

    create() {
        /**
         * common part of stage code 
         * */
        this.physics.world.setBounds(-50, 0, 1380, 720, true, false, true, true);
        this.physics.world.setFPS(660);
        // optional to set char variable
        this.char = createRectangle(this, 400, 720, 50, 50);
        this.physics.add.existing(this.char);
        this.char.body.setCollideWorldBounds(true, 0, 0);
        this.char.body.gravity.y = 1000;
        this.char.body.onWorldBounds = true;

        // you must set patterNums
        this.patternNums = [];
        // you must create new stageManager in your child class.
        this.stageManager = new StageManager(this, this.char);
        this.physics.world.on('worldbounds', function (body, up, down, left, right) {
            if (left) {
                body.gameObject.removeAllListeners();
                body.gameObject.setActive(false);
                body.gameObject.setVisible(false);
                body.destroy();
                this.stageManager.containsAndRemove(body.gameObject);
            }
        }, this);

        // you must set eventArgs
        this.eventArgs = [];


        // Debug Button to enter a start scene
        invokeDebug(this);
        this.fps = this.add.text(100, 80, "", { fontSize: '30px' });

    }

    enableCharacterControl() {
        this.g_obj_conroller = new GameObjectController(this, this.char);
    }

    createStageManager() {
        return new StageManager(this, this.char);
    }

    createPatternGroup() {
        this.stageManager.createPatternGroup(this.patternNums);
    }

    // Setting Obstacles with Time Events.
    emitTimeEvent() {
        this.time.addEvent({
            delay: 2000,
            repeat: this.stageManager.patternLength() - 1,
            callback: this.stageManager.moveFirstPattern,
            callbackScope: this.stageManager,
            args: this.eventArgs,
            startAt: 0,
        });
    }

    setNextScene(nextScene, name) {
        this.stageManager.nextScene = nextScene;
        this.stageManager.name = name;
    }


    update() {
        this.fps.setText([this.game.getTime(), this.game.getFrame()]);
        this.stageManager.overlapCharacterAndPattern();
    }

}