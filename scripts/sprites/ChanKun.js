class ChanKun extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.setTexture("chanKun");
        this.setPosition(x, y);
    }
}