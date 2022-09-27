import Phaser from "phaser";
import GameWall from "./GameObject/GameWall";
import { GameMode, GameOption } from "./GameObject/GameOption";
import Vector2 = Phaser.Math.Vector2;
import Player from "./GameObject/Player";
import SquareText from "./GameObject/SquareText";

export class PlayGameScene extends Phaser.Scene
{
    leftSquare: GameWall;
    rightSquare: GameWall;
    leftWall: GameWall;
    rightWall: GameWall;

    player:Player;
    squareText:SquareText;
    playerTweenTargets : any[];

    levelText:SquareText;

    gameWidth: number = 0;
    gameHeight: number = 0;

    rotateTween:Phaser.Tweens.Tween;
    growTween:Phaser.Tweens.Tween;

    currentMode:number = GameMode.IDLE;

    infoGroup:Phaser.GameObjects.Group;

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
        
        this.squareText = new SquareText(this, this.player.x, this.player.y,
            'myFont', "1", 120, tintColor);
            this.add.existing(this.squareText);
            this.playerTweenTargets = [this.player, this.squareText];

        this.levelText = new SquareText(this, this.player.x, 50,
            'myFont', "Level 1", 120, 0xffffff);
                
        this.add.existing(this.levelText);
        this.updateLevel();

        this.input.on("pointerdown", this.grow, this);
        this.input.on("pointerup", this.stop, this);

    }

    grow():void
    {
        console.log("성장!");
        if(this.currentMode == GameMode.WAITING)
        {
            this.currentMode = GameMode.GROWING;

            this.growTween = this.tweens.add({
                targets:this.playerTweenTargets,
                scaleX:1,
                scaleY:1,
                duration:GameOption.growTime
            });
        }
    }
    stop():void
    {
        if(this.currentMode == GameMode.GROWING)
        {
            this.currentMode = GameMode.IDLE;
            this.rotateTween.stop();
            this.growTween.stop();

            this.tweens.add({
                targets:this.playerTweenTargets,
                angle:0,
                duration:300,
                ease:'Cubic.easeOut',
                onComplete:()=>{
                    if(this.player.displayWidth <=this.rightSquare.x-this.leftSquare.x)
                    {
                        //아래로 빠지는 경우
                        this.tweens.add({
                            targets:this.playerTweenTargets,
                            y:this.gameHeight+this.player.displayHeight,
                            duration:600,
                            ease:'Cubic.easeIn',
                            onComplete:()=>{
                                
                            }
                        })
                    }
                    else
                    {
                        // 어떻게든 걸치는 경우
                        if(this.player.displayWidth<=this.rightWall.x-this.leftWall.x){
                            this.fallAndBounce(true);
                        }
                        else{
                            this.fallAndBounce(false);
                        }
                    }
                }
            })
        }
    }
 

    fallAndBounce(success:boolean):void{
        let destY:number=this.gameHeight
        -this.leftSquare.displayHeight
        -this.player.displayHeight*0.5;

        if(success)
        {

        }
        else
        {
            destY=this.gameHeight
            -this.leftWall.displayHeight
            -this.leftSquare.displayHeight
            -this.player.displayHeight*0.5;
        }
        this.tweens.add({
            targets:this.playerTweenTargets,
            y:destY,
            duration:600,
            ease:'Bounce.easeOut'
        });
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
            targets:this.playerTweenTargets,
            y:150,
            duration:500,
            ease:'Cubic.easeOut',
            onComplete:()=> {
                this.rotateTween = this.tweens.add({
                    targets:this.playerTweenTargets,
                    angle:40,
                    duration:300,
                    yoyo:true,
                    repeat:-1
                 });
                 this.addInfo(holeWidth, wallWidth);
                 this.currentMode = GameMode.WAITING;
            }
         });
    }

    addInfo(holeWidth:number, wallWidth:number)
    {
        this.infoGroup = this.add.group();
        let targetSquare:Phaser.GameObjects.Sprite
        =this.add.sprite(this.gameWidth*0.5, this.gameHeight - this.leftSquare.displayHeight, 'square');
        
        targetSquare.alpha=0.3;
        targetSquare.setOrigin(0.5, 1);
        targetSquare.displayHeight = holeWidth+wallWidth;
        targetSquare.displayWidth = holeWidth+wallWidth
        this.infoGroup.add(targetSquare);
    }
}