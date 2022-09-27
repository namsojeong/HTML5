window.addEventListener("load", () => {
    let btn = document.querySelector("#btn");
    let toggle = false;
    let box = document.querySelector(".box");
    //alt +shift + f 는 자동 들여쓰기
    btn.addEventListener("click", () => {
        if (toggle == true) {
            box.classList.remove("on");
        } else {
            box.classList.add("on");
        }
        toggle = !toggle;
    });

    let action = () => {
        btn.click();
    };
    let id = setInterval(action, 200);
    console.log(id);

    document.querySelector("#stop").addEventListener("click", () => {
        clearInterval(id);
    });
});
