import { Rect } from "./Rect.js";
import { Vector2 } from "./Vector2.js";

export class GameObject 
{
    rect:Rect;
    constructor(x:number, y:number, width:number, height:number)
    {
        this.rect = new Rect(x, y, width, height);
    }

    translate(delta: Vector2)
    {
        this.rect.pos.add(delta);
    }
}