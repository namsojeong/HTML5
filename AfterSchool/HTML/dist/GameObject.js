import { Rect } from "./Rect.js";
export class GameObject {
    constructor(x, y, width, height) {
        this.rect = new Rect(x, y, width, height);
    }
    translate(delta) {
        this.rect.pos.add(delta);
    }
}
