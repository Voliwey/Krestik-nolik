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


let player = "X";


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
    let result = false;
    if (!evt.target.classList.contains("js-item") || evt.target.textContent) {
        return;
    }
        
    const itemId = Number(evt.target.dataset.id)
   

    if (player === "X") {
        historyX.push(itemId)
        result = historyX.length >= 3 && checkWinner(historyX)
        evt.target.style.color = "green"
    } else {
        historyO.push(itemId)
        result = historyO.length >= 3 && checkWinner(historyO)
        evt.target.style.color = "red";
    }

    if(result){
    const instance = basicLightbox.create(`
	<div class="box">
    <h1>Игрок - ${player} победил 🤠!</h1>
    </div>`)
        instance.show(()=> restart())
        
    }
    const isEnd = historyO.length + historyX.length === container.children.length
    
    if (isEnd) {
        const instance = basicLightbox.create(`
	<div class="box">
    <h1>Ничья 😅</h1>
    </div>`)
        instance.show(()=> restart())
    }
   
    evt.target.textContent = player
    player = player === "X"? "O" : "X"
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