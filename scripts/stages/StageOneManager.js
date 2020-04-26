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
        this.patternManager = new PatternManager(this.scene);
    }

    createPatternGroup(patternNums) {
        this.patternGroup = this.patternManager.createPatternByNums(patternNums);
        this.patternArray = this.patternGroup.getChildren();
        this.addPatternPhysicsBody();

        return this.patternGroup;
    }

    addPatternPhysicsBody() {
        this.patternArray.forEach(pattern => {
            pattern.getChildren().forEach(obstacle => {
                this.scene.physics.add.existing(obstacle);
            });
        });
    }

    moveFirstPattern() {
        let firstPattern = this.patternArray.shift();
        firstPattern.getChildren().forEach(obstacle => {
            obstacle.body.setVelocity(-300, 0);
        });
        this.patternMovingArray.push(firstPattern);
    }

    collidePatterns() {
        if (this.patternMovingArray.length == 0) {
            return;
        }

        this.patternMovingArray.forEach(pattern => {
            if (pattern.getLength() == 0) {
                return;
            }
            pattern.getChildren().forEach(obstacle => {
                if (obstacle.getBounds().right < 0) {
                    pattern.remove(obstacle, true, true);
                }
            });
            this.scene.physics.overlap(
                this.player,
                pattern,
                function (first_obj, second_obj) {
                },
                function (first_obj, second_obj) {
                    // this.xV = first_obj.body.velocity.x * -100;
                    // this.yV = first_obj.body.velocity.y * -80;
                    // first_obj.body.setVelocity(this.xV, this.yV);
                    // this.scene.cameras.main.shake(300);
                },
                this
            );
        });
    }

    patternLength() {
        return this.patternGroup.getChildren().length;
    }
}