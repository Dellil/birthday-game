/**
 * The scene for the second stage
 * 2020/04/29
 * Chanhee Jang
 */
import StageParent from './StageParent.js';
import StageThree from './StageThreeScene.js';


export default class StageTwoScene extends StageParent {
    constructor(config) {
        super(config);
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.enableCharacterControl();
        this.patternNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.setNextScene(StageThree, "STAGE3");
        this.createPatternGroup();
        this.eventArgs = [-500];
        this.emitTimeEvent();
    }

    update() {
        super.update();
        this.stageManager.overlapCharacterAndTicket();
    }
}