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
        this.load.audio("moon-night", "http://127.0.0.1:8080/resources/musics/moonnight.mp3");
    }

    create() {
        console.log(this);
        super.create();
        this.bgm = this.sound.add("moon-night");

        this.bgm.play({
            volume: 0.3
        });
        this.stageManager.setStageBgm(this.bgm);
        this.enableCharacterControl();
        this.patternNums = [1, 4, 2, 5, 3, 1, 6, 3, 8, 2, 5, 4, 6, 7, 2];
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