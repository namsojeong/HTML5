import { GameObject } from "./GameObject.js";
import { App } from "./app.js";
export class Button extends GameObject {
    constructor(x, y, width, height, text, action) {
        super(x, y, width, height);
        this.isHover = false; //마우스 내 위에 왔다면 트루
        this.text = text;
        this.action = action;
    }
    update(dt) {
        let pos = App.instance.mousePos;
        let { x, y, width, height } = this.rect;
        this.isHover = pos.x > x && pos.x < x + width && pos.y > y && pos.y < y + height;
    }
    checkClick() {
        if (this.isHover) {
            this.action();
        }
    }
    render(ctx) {
        ctx.save();
        ctx.fillStyle = "#fff";
        let { x, y, width, height } = this.rect;
        ctx.fillRect(x, y, width, height);
        if (this.isHover) {
            ctx.fillStyle = "#777";
        }
        else {
            ctx.fillStyle = "#000";
        }
        ctx.fillRect(x + 3, y + 3, width - 6, height - 6);
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center"; //텍스트의 가로 정렬
        ctx.textBaseline = "middle"; //텍스트의 세로 정렬
        ctx.font = "18px Arial";
        ctx.fillText(this.text, x + width / 2, y + height / 2);
        ctx.restore();
    }
}
