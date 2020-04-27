/**
 * this class configures the first scene when game started.
 */
import StageStart from './StageStart.js';
import StageOneScene from './StageOneScene.js';

export default class StageManagerScene extends Phaser.Scene {
    create() {
        this.scene.add("stage_start", StageOneScene, true);
    }
}