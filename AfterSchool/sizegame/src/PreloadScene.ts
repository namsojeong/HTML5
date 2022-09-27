import base from "./Assets/base.png";
import square from "./Assets/square.png";
import top from "./Assets/top.png";

export class PreloadScene extends Phaser.Scene
{
    constructor()
    {
        super({key:"Preload"});
    }

    preload() : void
    {
        this.load.image("base", base);
        this.load.image("square", square);
        this.load.image("top", top); 
        
        this.load.bitmapFont("myFont", "./Assets/font.png", "./Assets/font.fnt");
        console.log("preload Preload");
    }

    create() : void
    {
        this.scene.start("PlayGame");
        console.log("preload create");
    }
}