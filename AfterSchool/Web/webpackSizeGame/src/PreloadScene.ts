import Phaser from "phaser";
export class PreloadScene extends Phaser.Scene
{
    constructor()
    {
        super({key:"Preload"});
    }

    preload() : void
    {
        this.load.image("base", "Assets/base.png");
        this.load.image("square", "Assets/square.png");
        this.load.image("top", "Assets/top.png"); 
        
        this.load.bitmapFont("myFont", "Assets/font.png", "Assets/font.fnt");
        console.log("preload Preload");
    }

    create() : void
    {
        this.scene.start("PlayGame");
        console.log("preload create");
    }
}