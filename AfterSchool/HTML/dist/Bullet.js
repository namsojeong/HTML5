import { Collider } from "./Collider.js";
import { GameObject } from "./GameObject.js";
import { Rect } from "./Rect.js";
import { Vector2 } from "./Vector2.js";
import { App } from "./app.js";
export class Bullet extends GameObject {
    constructor(x, y, width, height, speed, img) {
        super(x, y, width, height);
        this.lifeTime = 0;
        this.img = img;
        this.speed = speed;
        this.dir = new Vector2(0, 0);
        this.collider = new Collider(this.rect, new Rect(0, 0, 0, 0));
    }
    setDirection(dir) {
        this.dir = dir;
    }
    update(dt) {
        this.lifeTime += dt;
        this.translate(this.dir.multiply(this.speed * dt));
    }
    render(ctx) {
        const { x, y, width, height } = this.rect;
        ctx.drawImage(this.img, x, y, width, height);
        this.collider.render(ctx);
        if (App.debug)
            this.collider.render(ctx);
    }
    isOutofScreen(width, height) {
        if (this.lifeTime < 1)
            return false;
        return this.rect.x - this.rect.width < 0
            || this.rect.y - this.rect.height < 0
            || this.rect.x > width
            || this.rect.y > height;
    }
    reset(pos, dir) {
        this.lifeTime = 0;
        this.rect.pos = pos;
        this.setDirection(dir);
    }
}
