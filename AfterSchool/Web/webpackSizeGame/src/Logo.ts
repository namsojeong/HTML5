import Phaser from "phaser";

export class Logo extends Phaser.GameObjects.Image {
    
    //scene: Phaser.Scene;
    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);
      //  this.scene = scene;
    }

    moveTo(x: number, y: number) {
        this.scene.tweens.add({
            targets: this,
            x: x,
            y: y,
            duration: 1500,
            ease: 'Cubic.easeOut',
        });
    }
}