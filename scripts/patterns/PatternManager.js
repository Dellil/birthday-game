/**
 * ObstaclePattern Manager
 * 2020/04/26
 */
import ObstaclePattern from './ObstaclePattern.js';


export default class PatternManager {
    constructor(scene_obj, player) {
        this.scene = scene_obj;
        this.pattern = new ObstaclePattern(scene_obj);
        this.player = player;
        this.xV = 0;
        this.yV = 0;
    }

    getPattern1() {
        let pattern1 = this.pattern.getPattern1();
        pattern1.getChildren().forEach(obstacle => {
            this.scene.physics.add.existing(obstacle);
            obstacle.body.setVelocity(-300, 0);
        })
        return pattern1;
    }

    // Debug Method! modify the code when develop a real-game
    pattern1CollideControl(o_group) {
        this.scene.physics.overlap(
            this.player,
            o_group,
            function (first_obj, second_obj) {
                first_obj.body.setVelocity(this.xV, this.yV);
                this.scene.cameras.main.shake(300);
            },
            function (first_obj, second_obj) {
                this.xV = first_obj.body.velocity.x * -100;
                this.yV = first_obj.body.velocity.y * -80;
            },
            this
        );

        o_group.getChildren().forEach(obstacle => {
            if (obstacle.getBounds().right < 0) {
                obstacle.setX(1330);
            }
        });
    }

    getPattern2() {
        let pattern2 = this.pattern.getPattern2();
        pattern2.getChildren().forEach(obstacle => {
            this.scene.physics.add.existing(obstacle);
            obstacle.body.setVelocity(-300, 0);
        })
        return pattern2;
    }

    // Debug Method! modify the code when develop a real-game
    pattern2CollideControl(o_group) {
        this.scene.physics.overlap(
            this.player,
            o_group,
            function (first_obj, second_obj) {
                first_obj.body.setVelocity(this.xV, this.yV);
                this.scene.cameras.main.shake(300);
            },
            function (first_obj, second_obj) {
                this.xV = first_obj.body.velocity.x * -100;
                this.yV = first_obj.body.velocity.y * -80;
            },
            this
        );

        o_group.getChildren().forEach(obstacle => {
            if (obstacle.getBounds().right < 0) {
                obstacle.setX(1330);
            }
        });
    }


}