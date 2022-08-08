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

let memorySquares = [];
function squaresSequence() {
    
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
    squaresSequence();
 

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
        
   // resetMemorySquaresArray();
}

function resetMemorySquaresArray() {
    for(let i = 0; i < 5; i++){
        let square = document.getElementById(`${memorySquares[i]}`)
        square.style.backgroundColor = 'white';
    }
    
    memorySquares = [];
    
}

// handles squares initially changing color
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

// handles squares going back to white
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
let counter = 0;
allSquares.forEach(square => {
    square.addEventListener('click', function() {
       
            if(memorySquares[counter] == parseInt(square.id)){
                square.style.backgroundColor = 'green';
                counter++;
                console.log(counter)
            } else {
                console.log(`wrong square...`)
            }
            if(counter == 5) {
                
                resetMemorySquaresArray();
                console.log(memorySquares);
                counter = 0;
            }
    })
    
})




start.addEventListener('click', beginGame);