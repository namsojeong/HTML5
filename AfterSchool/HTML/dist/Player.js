import { Collider } from "./Collider.js";
import { GameObject } from "./GameObject.js";
import { Rect } from "./Rect.js";
import { Vector2 } from "./Vector2.js";
import { App } from "./app.js";
export class Player extends GameObject {
    constructor(x, y, width, height, speed, img) {
        super(x, y, width, height);
        this.keyArr = [];
        this.speed = speed;
        this.img = img;
        this.collider = new Collider(this.rect, new Rect(10, 10, -20, -20));
        document.addEventListener("keydown", e => {
            this.keyArr[e.keyCode] = true;
        });
        document.addEventListener("keyup", e => {
            this.keyArr[e.keyCode] = false;
        });
    }
    update(dt) {
        let delta = new Vector2(0, 0);
        if (this.keyArr[37])
            delta.x = -1;
        if (this.keyArr[38])
            delta.y = -1;
        if (this.keyArr[39])
            delta.x = 1;
        if (this.keyArr[40])
            delta.y = 1;
        delta = delta.normalize;
        delta = delta.multiply(this.speed * dt);
        this.translate(delta);
        //console.log(this.rect);
    }
    render(ctx) {
        let { x, y, width, height } = this.rect;
        ctx.drawImage(this.img, x, y, width, height);
        this.collider.render(ctx);
        if (App.debug)
            this.collider.render(ctx);
    }
}
