export class Vector2 
{
    x: number;
    y: number;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    get magnitude(): number
    {
        return  Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalize(): Vector2
    {
        const m: number = this.magnitude;
        if(this.x == 0 && this.y == 0)
        {
            return new Vector2(0, 0);
        }
        
        return new Vector2(this.x / m, this.y / m);
    }

    multiply(n : number): Vector2
    {
        return new Vector2(this.x * n, this.y * n);
    }

    add(v: Vector2)
    {
        this.x += v.x;
        this.y += v.y;
    }
    
}