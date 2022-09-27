import Phaser from "phaser";
import GameWall from "./GameObject/GameWall";
import { GameOption } from "./GameObject/GameOption";
import Vector2 = Phaser.Math.Vector2;
import Player from "./GameObject/Player";

export class PlayGameScene extends Phaser.Scene
{
    leftSquare: GameWall;
    rightSquare: GameWall;
    leftWall: GameWall;
    rightWall: GameWall;

    player:Player;

    gameWidth: number = 0;
    gameHeight: number = 0;

    constructor()
    {
        super({key:"PlayGame"});
    }

    create(): void 
    {
        this.gameWidth = this.game.config.width as number;
        this.gameHeight = this.game.config.height as number;
        let tintColor = Phaser.Utils.Array.GetRandom(GameOption.bgColors);
        
        this.cameras.main.setBackgroundColor(tintColor);

        this.placeWalls();

        this.player = new Player(this, this.gameWidth*0.5, -400, 'square');
        this.add.existing(this.player);

        this.updateLevel();

        this.input.on("pointerdown", this.grow, this);
        this.input.on("pointerup", this.stop, this);

    }

    grow():void
    {
        console.log("성장!");
    }
    stop():void
    {
        console.log("멈춰!");
    }
 
    placeWalls(): void
    {
        this.leftSquare = new GameWall(
            this, 0, this.gameHeight, 'base', new Vector2(1, 1));
        this.add.existing(this.leftSquare);
        this.rightSquare = new GameWall(
            this, this.gameWidth, this.gameHeight, "base", new Vector2(0, 1));
        this.add.existing(this.rightSquare);

        this.leftWall = new GameWall(
            this, 0, this.gameHeight - this.leftSquare.height, "top", 
            new Vector2(1, 1));
        this.add.existing(this.leftWall);
        this.rightWall = new GameWall(
            this, this.gameWidth, this.gameHeight - this.rightSquare.height, "top", 
            new Vector2(0, 1));
        this.add.existing(this.rightWall);

    }

    updateLevel():void
    {
        let holeWidth:number=
        Phaser.Math.Between(GameOption.holeWidthRange[0], GameOption.holeWidthRange[1]);

        let wallWidth : number =
        Phaser.Math.Between(GameOption.wallRange[0], GameOption.wallRange[1]);

        console.log(holeWidth, wallWidth);

         this.leftSquare.tweenTo((this.gameWidth-holeWidth)*0.5, 500);
         this.rightSquare.tweenTo((this.gameWidth+holeWidth)*0.5, 500);
         this.leftWall.tweenTo((this.gameWidth-holeWidth)*0.5-wallWidth, 500);
         this.rightWall.tweenTo((this.gameWidth+holeWidth)*0.5+wallWidth, 500);

         this.tweens.add({
            targets:this.player,
            y:200,
            duration:500,
            ease:'Cubic.easeOut'
         });
    }
}