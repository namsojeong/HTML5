import Phaser from "phaser"
import {PreloadScene}from "./PreloadScene"
import {PlayGameScene}from "./PlayGameScene"

const ScaleObject: Phaser.Types.Core.ScaleConfig={
    mode:Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent:'ggm',
    width:640,
    height:960
};

const config : Phaser.Types.Core.GameConfig = {
    type:Phaser.AUTO,
    scale:ScaleObject,
    scene:[PreloadScene, PlayGameScene]
};

new Phaser.Game(config);