import Vector2 = Phaser.Math.Vector2;


export default class GameWall extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, key: string, origin: Vector2)
    {
        super(scene, x, y, key);

        this.setOrigin(origin.x, origin.y);
    }

    tweenTo(x:number, time:number):void
    {
        this.scene.tweens.add({
            targets:this,
            x:x,
            duration:time,
            ease:'Cubic.easeOut'
        });
    }
}