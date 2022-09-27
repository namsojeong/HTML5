import {Person, GGM} from "./Person.js";


//  클래스룸 수업 코드 : gmgh5k3
// JSON, prototype, 클래스, TS
// const 는 상수를 의미한다. 변경안됌

const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");

let playerX = 10;
let playerY = 10;
let playerColor = "#f00";
let speed = 150; //초당 150px
let playerSize = 30;

//이녀석은 이미 만들어진 객체로 쓸수 있다.
// keydown, keyup, keypress
let keyArr = [];
document.addEventListener("keydown", e =>{
    keyArr[e.keyCode] = true;
});
document.addEventListener("keyup", e =>{
    keyArr[e.keyCode] = false;
});

function Update()
{
    if(keyArr[37] == true) {
        playerX -= speed / 60;
    }
    if(keyArr[38] == true) {
        playerY -= speed / 60;
    }
    if(keyArr[39] == true) {
        playerX += speed / 60;
    }
    if(keyArr[40] == true) {
        playerY += speed / 60;
    }
    if(playerX < 0) playerX = 0;
    if(playerY < 0) playerY = 0;
    if(playerX > canvas.width - playerSize) 
        playerX = canvas.width - playerSize;
    if(playerY > canvas.height - playerSize) 
        playerY = canvas.height - playerSize;

    //내일은 Player를 별도의 파일로 빼서 클래스화 시키는 걸 할건데
    //두가지 방법을 쓸거다
    //첫번째 : 프로토타입 방법 ES5
    //두번째 : 클래스 방법  ES6(2015)
}

function Render()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = playerColor;
    ctx.fillRect(playerX, playerY, playerSize, playerSize);
}

let gameLoop = setInterval(()=>{
    Update();
    Render();
}, 1000/ 60);

// function A(){
//     console.log(this);
//     this.a = 10;
// }

// let c = new A();
// class 와 object JSON
// ES 5 2013, 
// ECMA Script



let obj1 = new Person("최선한", 123);
let obj2 = new Person("테스트", 321);

console.log(obj1, obj2);