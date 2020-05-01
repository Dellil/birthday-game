/**
 * Game Start Scene
 * 2020/04/23
 * Chanhee Jang
 */
import StageOneScene from './StageOneScene.js';
import StageTwoScene from './StageTwoScene.js';
import StageThreeScene from './StageThreeScene.js';
import StageEnd from './StageEnd.js';

export default class StageStartScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.stages = [StageOneScene, StageTwoScene, StageThreeScene, StageEnd];
    }

    preload() {
        this.load.image("bg-1", "http://127.0.0.1:8080/resources/backgrounds/bg-1.png");
        this.load.image("bg-2", "http://127.0.0.1:8080/resources/backgrounds/bg-2.png");
    }

    create() {
        this.addBg();
        let texts = this.setTextInteractive(this.addText());
        this.setEvent(texts);
    }

    addBg() {
        let bg1 = this.add.image("640", "360", "bg-1");
        bg1.setDisplaySize(1280, 720);

        let bg2 = this.add.image("640", "360", "bg-2");
        bg2.setDisplaySize(1280, 720);
    }

    addText() {
        let stageOne = this.add.text(100, 150, "1", { fontSize: '40px' });
        let stageTwo = this.add.text(150, 150, "2", { fontSize: '40px' });
        let stageThree = this.add.text(200, 150, "3", { fontSize: '40px' });
        let endText = this.add.text(100, 250, "Click to end", { fontSize: '40px' });

        return new Array(stageOne, stageTwo, stageThree, endText);
    }

    setTextInteractive(texts) {
        texts.forEach(text => {
            text.setInteractive();
        });

        return texts
    }

    setEvent(texts) {
        for (let i = 0; i < texts.length; i++) {
            texts[i].on("pointerdown", function (p, lX, lY, e) {
                this.scene.scene.add("stage_" + (i + 1), this.scene.stages[i], true);
                this.scene.scene.remove(this.scene);
            })
        }
    }


    update() {

    }
}