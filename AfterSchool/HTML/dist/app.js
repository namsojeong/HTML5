import { Bullet } from "./Bullet.js";
import { Button } from "./Button.js";
import { Player } from "./Player.js";
import { Vector2 } from "./Vector2.js";
export class App {
    constructor(selector) {
        this.bulletList = [];
        this.time = 0;
        this.levelTimer = 0;
        this.gameOver = false;
        this.mousePos = new Vector2(0, 0);
        this.canvas = document.querySelector(selector);
        this.ctx = this.canvas.getContext("2d");
        let playerImage = new Image();
        playerImage.src = "./dist/image/Player.png";
        //이거 이렇게 하면 나중에 오류 생긴다.
        this.player = new Player(200, 200, 45, 35, 150, playerImage);
        this.bulletImage = new Image();
        this.bulletImage.src = "./dist/image/CircleBullet.png";
        for (let i = 0; i < 30; i++) {
            let b = this.makeBullet();
            this.bulletList.push(b);
        }
        this.canvas.addEventListener("mousemove", e => {
            let { offsetX, offsetY } = e;
            //this.mousePos = new Vector2(offsetX, offsetY);
            this.mousePos.x = offsetX;
            this.mousePos.y = offsetY;
        });
        this.canvas.addEventListener("click", e => {
            this.restartBtn.checkClick(); //자기가 가지고 있는 모든 UI를 돌면서 체크
        });
        this.restartBtn = new Button(this.canvas.width / 2 - 60, 300, 120, 60, "Restart", () => {
            this.gameStart();
            console.log("재시작");
        });
        this.loop();
    }
    gameStart() {
        this.gameOver = false;
        this.time = 0;
        this.player.rect.pos = new Vector2(200, 200);
        this.levelTimer = 0;
        this.bulletList = [];
        for (let i = 0; i < 30; i++) {
            let b = this.makeBullet();
            this.bulletList.push(b);
        }
    }
    loop() {
        const dt = 1 / 60; // 1/60초를 델타타임으로 고정해서 넣는다.
        setInterval(() => {
            this.update(dt);
            this.render();
        }, 1000 / 60);
    }
    update(dt) {
        this.restartBtn.update(dt); //UI는 게임오버가 되었어도 업데이트를 해줘야 한다.
        if (this.gameOver)
            return;
        this.player.update(dt);
        this.bulletList.forEach(x => x.update(dt));
        this.bulletList.forEach(x => {
            if (x.isOutofScreen(this.canvas.width, this.canvas.height)) {
                let pos = this.getRandomPositionInScreen();
                x.rect.pos = pos;
                let dir = this.getToPlayerDirection(x);
                x.reset(pos, dir);
            }
        });
        if (this.gameOver)
            return;
        this.time += dt;
        this.levelTimer += dt;
        this.checkLevel();
        this.checkCollision();
    }
    checkCollision() {
        // let isCol: boolean = 
        //     this.bulletList.filter(
        //         x => x.collider.checkCollision(this.player.collider)).length >= 1;
        let isCol = false;
        this.bulletList.forEach(x => {
            if (x.collider.checkCollision(this.player.collider)) {
                isCol = true;
            }
        });
        if (isCol) {
            console.log("Boom!");
            this.gameOver = true;
        }
    }
    checkLevel() {
        if (this.levelTimer >= 5) {
            this.levelTimer = 0;
            let b = this.makeBullet();
            this.bulletList.push(b);
        }
    }
    makeBullet() {
        let pos = this.getRandomPositionInScreen();
        let b = new Bullet(pos.x, pos.y, 15, 15, 100, this.bulletImage);
        b.setDirection(this.getToPlayerDirection(b)); //플레이어 방향으로 진행하도록 한다.
        return b;
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.render(this.ctx);
        this.bulletList.forEach(x => x.render(this.ctx));
        this.renderUI();
    }
    renderUI() {
        let uiX = 10;
        let uiY = 10;
        this.ctx.save();
        this.ctx.font = "15px Arial";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(`현재 탄환 수 : ${this.bulletList.length}`, uiX, uiY);
        this.ctx.fillText(`버틴 시간 : ${this.time.toFixed(2)}`, uiX, uiY + 20);
        this.ctx.strokeStyle = "#000";
        let gagueX = this.canvas.width - 100;
        this.ctx.strokeRect(gagueX, uiY, 90, 15);
        this.ctx.fillStyle = "#61ed22";
        let width = this.levelTimer / 5 * 88;
        this.ctx.fillRect(gagueX + 1, uiY + 1, width, 13);
        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "#fff";
            this.ctx.font = "50px Arial";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "bottom";
            this.ctx.fillText("Game Over", this.canvas.width / 2, 150);
            this.ctx.fillStyle = "#fff";
            this.ctx.font = "40px Arial";
            this.ctx.fillText(`${this.time.toFixed(2)}`, this.canvas.width / 2, 250);
            this.restartBtn.render(this.ctx);
        }
        this.ctx.restore();
    }
    getRandomPositionInScreen() {
        let idx = Math.floor(Math.random() * 4); // 0, 1, 2, 3
        // 0은 위쪽, 1은 왼쪽, 2는 오른쪽, 3은 아래쪽에서 나오도록 코드를 작성하면 되고
        let x = 0;
        let y = 0;
        switch (idx) {
            case 0:
                x = Math.random() * this.canvas.width;
                y = -30;
                break;
            case 1:
                x = -30;
                y = Math.random() * this.canvas.height;
                break;
            case 2:
                x = this.canvas.width + 30;
                y = Math.random() * this.canvas.height;
                break;
            case 3:
                x = Math.random() * this.canvas.width;
                y = this.canvas.height + 30;
                break;
        }
        return new Vector2(x, y);
    }
    getToPlayerDirection(bullet) {
        let pc = this.player.rect.center; //플레이어 중앙값
        let bc = bullet.rect.center;
        return new Vector2(pc.x - bc.x, pc.y - bc.y).normalize;
    }
}
App.debug = false;
window.addEventListener("load", () => {
    App.instance = new App("#gameCanvas");
});
