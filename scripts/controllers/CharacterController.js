export default class GameObjectController {
    constructor(scene_obj, game_obj) {
        this.scene_obj = scene_obj;
        this.game_obj = game_obj;
        this.space = scene_obj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.left = scene_obj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right = scene_obj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.keyArray = [this.space, this.left, this.right];
    }

    spaceController() {
        this.space.on('up', function (key, event) {
            let time_pressed = key.timeDown - key.timeUp;
            const velo_constant = -220;
            if (time_pressed < -500) {
                time_pressed = -500;
            }
            time_pressed = time_pressed * 1.4;
            const velo_sum = time_pressed + velo_constant;

            this.game_obj.body.setVelocityY(velo_sum);
        }, this);
    }

    leftController() {
        this.left.on('down', function (key, event) {
            this.game_obj.body.setVelocityX(-400);
        }, this);

        this.left.on('up', function (key, event) {
            if (this.right.isDown) {
                this.game_obj.body.setVelocityX(400);
            } else {
                this.game_obj.body.setVelocityX(0);
            }
        }, this);
    }

    rightController() {
        this.right.on('down', function (key, event) {
            this.game_obj.body.setVelocityX(400);
        }, this);

        this.right.on('up', function (key, event) {
            if (this.left.isDown) {
                this.game_obj.body.setVelocityX(-400);
            } else {
                this.game_obj.body.setVelocityX(0);
            }
        }, this);
    }
}