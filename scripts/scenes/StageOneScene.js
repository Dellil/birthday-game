/**
 * The scene for the first stage
 * 2020/04/23
 * Chanhee Jang
 */
import StageParent from './StageParent.js';
import StageTwo from './StageTwoScene.js';


export default class StageOneScene extends StageParent {
    constructor(config) {
        super(config);
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();

        this.enableCharacterControl();
        this.patternNums = [9, 2, 6, 5, 8, 1, 3, 7];
        this.setNextScene(StageTwo, "STAGE2");
        this.createPatternGroup();
        this.eventArgs = [-500];
        this.emitTimeEvent();
    }

    update() {
        super.update();
        this.stageManager.overlapCharacterAndTicket();
    }
}