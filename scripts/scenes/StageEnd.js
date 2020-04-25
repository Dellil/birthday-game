import invokeDebug from '../debugs/DebugScene.js';


export default class StageEndScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {

    }

    create() {
        let startText = this.add.text(100, 50, "Stage End Scene", { fontSize: '40px' });
        invokeDebug(this);
    }

    update() {

    }
}