/**
 * ObstaclePattern Manager
 * 2020/04/26
 */
import ObstaclePattern from './ObstaclePattern.js';


export default class PatternManager {
    constructor(scene_obj) {
        this.scene = scene_obj;
        this.pattern = new ObstaclePattern(this.scene);
    }

    createGroup(patterns) {
        return this.scene.add.group(patterns);
    }

    createPatternByNums(nums) {
        let patterns = new Array();
        nums.forEach(num => {
            patterns.push(this.pattern.getPatternPuttingNumber(num));
        });

        return this.createGroup(patterns);
    }

    createNextStageObject() {
        return this.pattern.getPattern0();
    }
}