import Phaser, { Scene } from "phaser";

export default class SquareText extends Phaser.GameObjects.BitmapText {
    constructor(scene: Phaser.Scene, x: number, y: number, font: string, text: string, size: number, tintColor: number) {
        super(scene, x, y, font, text, size);
        this.setOrigin(0.5,0.5);
        this.setScale(0.4);
        this.setTint(tintColor);
    }
}