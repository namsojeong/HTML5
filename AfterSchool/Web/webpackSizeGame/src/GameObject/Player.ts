export default class Player extends Phaser.GameObjects.Sprite
{
    successful:number;

    constructor(scene:Phaser.Scene, x:number, y:number, key:string)
    {
        super(scene, x, y, key);
        this.successful = 0;
        this.setScale(0.2); // 처음 축소를 해두었다가 커지게

    }
}