import StageStart from './StageStart.js';

export default class StageTwoScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {

    }

    create() {
        let startText = this.add.text(100, 50, "Stage Three Scene", { fontSize: '40px' });
        this.invokeDebug();
    }

    update() {

    }

    invokeDebug() {
        let stageStart = this.add.text(100, 150, "Go to Start", { fontSize: '40px' });
        stageStart.setInteractive();
        stageStart.on("pointerdown", function (p, lX, lY, e) {
            this.scene.scene.add("stageStart", StageStart, true);
            this.scene.scene.remove(this.scene);
        });
    }
}