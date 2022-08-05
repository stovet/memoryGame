const container = document.querySelector('#container');
const start = document.querySelector('#startBtn');


const id = [];

for(let i = 0; i < 25; i++) {
    id[i] = i;
    let box = document.createElement('div');
    box.classList.add('square');
    box.setAttribute('id', id[i] +1)
    container.append(box);
}

const allSquares = document.querySelectorAll('div');

function squaresSelected() {
    
    for(let i = 0; i < 5; i++) {
        
        let randomNum = Math.floor(Math.random() * 25) + 1;
        if(memorySquares.includes(randomNum)) {
          i--;
        } else {
            memorySquares.push(randomNum);
        }
    }
    getMemorySquares(memorySquares);
}

function getMemorySquares(squares) {
    memorySquares = squares;
}

function beginGame() {
    squaresSelected();
 

    console.log(memorySquares)
    startPattern('red', memorySquares, 1000, 0)
        .then(() => startPattern('red', memorySquares, 1000, 1))
        .then(() => startPattern('red', memorySquares, 1000, 2))
        .then(() => startPattern('red', memorySquares, 1000, 3))
        .then(() => startPattern('red', memorySquares, 1000, 4))

    removePattern(memorySquares, 2000, 0)
        .then(() => removePattern(memorySquares, 1000, 1)) 
        .then(() => removePattern(memorySquares, 1000, 2))   
        .then(() => removePattern(memorySquares, 1000, 3))   
        .then(() => removePattern(memorySquares, 1000, 4))
}
let memorySquares = [];
const startPattern = (color, squares, delay, counter) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {  
                    let pick = document.getElementById(`${squares[counter]}`)
                    pick.style.backgroundColor = color;
                    counter++;
                resolve();
        }, delay)
    })
}

const removePattern = (squares, delay, counter) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let pick = document.getElementById(`${squares[counter]}`)
            pick.style.backgroundColor = 'white';
            counter++;
            resolve();
        }, delay)
    })
}

function getMemorySquares(squares) {
    return squares;
}

allSquares.forEach(square => {
    square.addEventListener('click', function() {
        console.log(memorySquares);
        if(memorySquares.includes(parseInt(square.id))){
            square.style.backgroundColor = 'green';
        } else {
            console.log(`not working.... ${square.id}`)
        }
    })
})


start.addEventListener('click', beginGame);