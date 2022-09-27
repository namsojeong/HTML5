import { Rect } from "./Rect.js";
export class Collider {
    constructor(rect, offset) {
        this.rect = rect;
        this.offset = offset;
    }
    update(dt) {
    }
    render(ctx) {
        ctx.save();
        ctx.strokeStyle = "#61ed22";
        let { x, y, width, height } = this.getCollisionRect();
        ctx.strokeRect(x, y, width, height);
        ctx.restore();
    }
    getCollisionRect() {
        let { x: x1, y: y1, width: w1, height: h1 } = this.rect;
        let { x: x2, y: y2, width: w2, height: h2 } = this.offset;
        return new Rect(x1 + x2, y1 + y2, w1 + w2, h1 + h2);
    }
    checkCollision(other) {
        let otherRect = other.getCollisionRect();
        let myRect = this.getCollisionRect();
        return myRect.x + myRect.width > otherRect.x
            && otherRect.x + otherRect.width > myRect.x
            && myRect.y + myRect.height > otherRect.y
            && otherRect.y + otherRect.height > myRect.y;
    }
}
