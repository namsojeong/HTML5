import { Vector2 } from "./Vector2.js";

export class Rect
{
    pos: Vector2;
    width: number;
    height: number;

    constructor(x:number, y:number, width:number, height:number)
    {
        this.pos = new Vector2(x, y);
        this.width = width;
        this.height = height;
    }

    get x():number {
        return this.pos.x;
    }

    get y():number {
        return this.pos.y;
    }
    
    get center() : Vector2
    {
        return new Vector2(this.x + this.width / 2, this.y + this.height /2);
    }
}