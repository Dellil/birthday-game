/**
 * The scene for the third stage
 * 2020/04/23
 * Chanhee Jang
 */
import StageParent from './StageParent.js';
import StageEnd from './StageEnd.js';


export default class StageThreeScene extends StageParent {
    constructor(config) {
        super(config);
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.enableCharacterControl();
        this.patternNums = [4, 8, 6, 2, 9, 1, 7, 2, 3];
        this.setNextScene(StageEnd, "STAGEEND");
        this.createPatternGroup();
        this.eventArgs = [-500];
        this.emitTimeEvent();
    }

    update() {
        super.update();
        this.stageManager.overlapCharacterAndTicket();
    }
}