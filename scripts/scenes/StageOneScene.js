/**
 * The Scene for prototype
 * 2020/04/23
 * Chanhee Jang
 */
import createRectangle from '../sprites/Rectangle.js';
import GameObjectController from "../controllers/CharacterController.js";
import StageStart from './StageStart.js';

export default class StageOneScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.rect = null;
        this.g_obj_conroller = null;
        this.xV = null;
        this.yV = null;
    }
    preload() {
        this.load.image("sky", "http://127.0.0.1:8080/resources/backgrounds/dark_night_sky.jpg");
    }
    create() {
        this.add.image(640, 360, "sky");
        this.rectChar = createRectangle(this, 300, 720, 50, 50);

        this.physics.add.existing(this.rectChar);
        this.rectChar.body.setCollideWorldBounds(true, 0, 0);

        this.g_obj_conroller = new GameObjectController(this, this.rectChar);
        this.g_obj_conroller.spaceController();

        this.rectObstacle = createRectangle(this, 500, 720, 50, 400);
        this.physics.add.existing(this.rectObstacle, true);

        this.invokeDebug();
    }
    update() {
        this.g_obj_conroller.leftController();
        this.g_obj_conroller.rightController();

        this.physics.collide(this.rectChar, this.rectObstacle,
            function (first_obj, second_obj) {
                first_obj.body.setVelocity(this.xV, this.yV);
                this.cameras.main.shake(300);
            },
            function (first_obj, second_obj) {
                this.xV = first_obj.body.velocity.x * -100;
                this.yV = first_obj.body.velocity.y * -80;

            }
            , this);
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
// TEST CODE
// export default {
//     preload: function preload() {
//         // load local files
//         this.load.image("sky", "http://127.0.0.1:8080/resources/backgrounds/dark_night_sky.jpg");
//     },
//     create: function create() {
//         this.add.image(640, 360, "sky");
//         let rect = createRectangle(this);

//         this.physics.add.existing(rect);
//         rect.body.setCollideWorldBounds(true, 0, 0);
//         game_obj_controller(this, rect);
//     },
//     update: function (t, d) {

//     }
// }