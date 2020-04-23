/**
 * set scene's configuration via this class
 */
import StageStart from './StageStart.js';


export default class StageManagerScene extends Phaser.Scene {
    create() {
        this.scene.add("stage_start", StageStart, true);
    }
}