const combinations = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [1,5,9],
    [3,5,7],
    [3,6,9]
]

const container = document.querySelector(".js-content")
const winsXElement = document.querySelector(".js-wins-x");
const winsOElement = document.querySelector(".js-wins-o");


let player = "X";
let winsX = 0;
let winsO = 0;


const historyX = [];
const historyO = [];

createMarkup() 
function createMarkup() {
    let murkup = ''
    for (let i = 1; i <= 9; i += 1){
        murkup += `<div class="item js-item" data-id=${i}></div>`
     
}

container.innerHTML = murkup
}


container.addEventListener('click',handlerClick)

function handlerClick(evt) {
    if (!evt.target.classList.contains("js-item") || evt.target.textContent) {
        return;
    }
        
    const itemId = Number(evt.target.dataset.id)

    if (player === "X") {
        historyX.push(itemId)
        evt.target.style.color = "green"
    } else {
        historyO.push(itemId)
        evt.target.style.color = "red";
    }

    const result = checkWinner(player === "X" ? historyX : historyO);

       if (result) {
        if (player === "X") {
            winsX += 1;
        } else {
            winsO += 1;
           }
            winsXElement.textContent = winsX;
            winsOElement.textContent = winsO;

        const instance = basicLightbox.create(`
	    <div class="box">
        <h1>Игрок - ${player} победил 🤠!</h1>
        </div>`);
        instance.show(() => restart());
        return;
    }

    const isEnd = historyO.length + historyX.length === container.children.length;
    if (isEnd) {
        const instance = basicLightbox.create(`
	    <div class="box">
        <h1>Ничья 😅</h1>
        </div>`);
        instance.show(() => restart());
        return;
    }

    evt.target.textContent = player;
    player = player === "X" ? "O" : "X";
}



function checkWinner(arr) {
    return combinations.some((item) => item.every(id => arr.includes(id)))
}

function restart() {
    player = "X"
    historyX.splice(0, historyX.length)
    historyO.splice(0,historyO.length)
    createMarkup()
}
