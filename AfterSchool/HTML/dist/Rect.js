import { Vector2 } from "./Vector2.js";
export class Rect {
    constructor(x, y, width, height) {
        this.pos = new Vector2(x, y);
        this.width = width;
        this.height = height;
    }
    get x() {
        return this.pos.x;
    }
    get y() {
        return this.pos.y;
    }
    get center() {
        return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
    }
}
