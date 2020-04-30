/**
 * To stage management easily.
 * 2020/04/27
 * 
 */
import PatternManager from '../patterns/PatternManager.js';


export default class StageManager {
    constructor(scene_obj, player_obj) {
        this.scene = scene_obj;
        this.player = player_obj;
        this.patternGroup = null;
        this.patternArray = null;
        this.patternMovingArray = new Array();
        this.xV = 0;
        this.yV = 0;
        this.patternManager = new PatternManager(this.scene);
        this.ticket = null;
        this.stageBgm = null;
        this.nextScene = null;
        this.name = null;
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

    moveFirstPattern(eventArgs) {
        let firstPattern = this.patternArray.shift();
        firstPattern.getChildren().forEach(obstacle => {
            obstacle.body.setVelocity(eventArgs, 0);
        });
        this.patternMovingArray.push(firstPattern);
    }

    // used in the scene's update method
    overlapCharacterAndPattern() {
        if (this.patternMovingArray.length == 0) {
            return;
        }
        this.patternMovingArray.forEach(pattern => {
            this.scene.physics.overlap(this.player, pattern, function () { },
                function (obj1, obj2) {
                    // obj1 is player object, 2 is rect-obstacle object
                    this.scene.cameras.main.shake(200);
                },
                this
            );
        });
    }

    overlapCharacterAndTicket() {
        if (this.ticket === null) {
            return;
        }
        this.scene.physics.overlap(
            this.player, this.ticket, function () {
            },
            function (obj1, obj2) {
                this.stageBgm.destroy();
                obj1.removeAllListeners();
                obj1.setActive(false);
                obj1.setVisible(false);
                obj1.body.destroy();
                this.scene.scene.remove(this.scene);
                this.scene.scene.add(this.name, this.nextScene, true);
            },
            this
        );
    }

    // used in time event
    patternLength() {
        return this.patternGroup.getChildren().length;
    }

    // used in physics world event
    containsAndRemove(object) {
        this.patternMovingArray.forEach(pattern => {
            if (pattern.contains(object) && pattern.countActive() == 0) {
                this.patternMovingArray.shift();
                if (this.patternMovingArray.length == 0) {
                    this.createNextStageObject();
                }
            }
        });
    }

    createNextStageObject() {
        this.ticket = this.patternManager.createNextStageObject();
    }

    setStageBgm(bgm) {
        this.stageBgm = bgm;
    }
}