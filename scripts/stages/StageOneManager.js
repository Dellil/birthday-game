/**
 * To stage management easily.
 * 2020/04/27
 */
import PatternManager from '../patterns/PatternManager.js';


export default class StageOneManager {
    constructor(scene_obj, player_obj) {
        this.scene = scene_obj;
        this.player = player_obj;
        this.patternGroup = null;
        this.patternArray = null;
        this.patternMovingArray = new Array();
        this.xV = 0;
        this.yV = 0;
        this.patternManager = new PatternManager(this.scene);
    }

    addPatternPhysicsBody() {
        this.patternArray.forEach(pattern => {
            pattern.getChildren().forEach(obstacle => {
                this.scene.physics.add.existing(obstacle);
                obstacle.body.onWorldBounds = true;
                obstacle.body.collideWorldBounds = true;
            })
        });
    }

    createPatternGroup(patternNums) {
        this.patternGroup = this.patternManager.createPatternByNums(patternNums);
        this.patternArray = this.patternGroup.getChildren();
        this.addPatternPhysicsBody();

        return this.patternGroup;
    }

    moveFirstPattern() {
        let firstPattern = this.patternArray.shift();
        firstPattern.getChildren().forEach(obstacle => {
            obstacle.body.setVelocity(-500, 0);
        });
        this.patternMovingArray.push(firstPattern);
    }

    overlapCharacterAndPattern() {
        if (this.patternMovingArray.length == 0) {
            return;
        }
        this.patternMovingArray.forEach(pattern => {
            this.scene.physics.overlap(
                this.player,
                pattern,
                function (obj1, obj2) { },
                function (obj1, obj2) {
                    this.scene.cameras.main.shake(200);
                    console.log(this.patternMovingArray.length);
                },
                this
            );
        });
    }

    patternLength() {
        return this.patternGroup.getChildren().length;
    }

    containsAndRemove(object) {
        this.patternMovingArray.forEach(pattern => {
            if (pattern.contains(object) && pattern.countActive() == 0) {
                this.patternMovingArray.shift();
            }
        });
    }
}