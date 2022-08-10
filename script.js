const container = document.querySelector('#container');
const start = document.querySelector('#startBtn');
const numberOfRounds = document.querySelector('#roundCount');
const bestScore = document.querySelector('#bestScore');

let highScore = 0;
let maxFlashCount = 5;
let roundCount = 0;
const id = []; // id for boxes for identification

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
    
    for(let i = 0; i < maxFlashCount; i++) {
        
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
 
    canYouClick = false;
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
        .then(() => youCanClick(true))
}

function resetMemorySquaresArray() {
    for(let i = 0; i < 5; i++){
        let square = document.getElementById(`${memorySquares[i]}`)
        square.style.backgroundColor = 'white';
    }
    
    memorySquares = [];
    
}

let canYouClick = false;

function youCanClick(click) {
    canYouClick = click;
}
// handles squares initially changing color
const startPattern = (color, squares, delay, counter) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {  
                    let pick = document.getElementById(`${squares[counter]}`)
                    pick.style.backgroundColor = color;
                    //counter++;
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
            //counter++;
            resolve();
        }, delay)
    })
}

let counter = 0;
let wrongSquare = false;

allSquares.forEach(square => {   
    square.addEventListener('click', function() {
            if(canYouClick){
            if(memorySquares[counter] == parseInt(square.id)){
                square.style.backgroundColor = 'green';
                counter++;
            } else {
                console.log(`wrong square... You lose`)
                wrongSquare = true; // force game fail
            }
            if(wrongSquare) {
                resetMemorySquaresArray();
                counter = 0;
                numberOfRounds.textContent = `${roundCount}`;
                if(roundCount >= highScore) {
                    highScore = roundCount;
                }
                bestScore.textContent = `${highScore}`
            }
            if(counter == maxFlashCount) { 
                roundCount++;
                resetMemorySquaresArray();
                console.log(memorySquares);
                counter = 0;
                numberOfRounds.textContent = `${roundCount}`;
                if(roundCount >= highScore) {
                    highScore = roundCount;
                }
                bestScore.textContent = `${highScore}`
            }
        }
        
    })

})



// function delayClick(delay) {
    // if(delay == true){
    //     allSquares.forEach(square => {
           
    //                 square.style.pointerEvents = 'none';

    //             })
    //          } if(delay == false) {
    
//         allSquares.forEach(square => {
//             //setTimeout(() => {
                
//                 square.addEventListener('click', function() {
//                     if(memorySquares[counter] == parseInt(square.id)){
//                         square.style.backgroundColor = 'green';
//                         counter++;
//                     } else {
//                         console.log(`wrong square... You lose`)
//                         wrongSquare = true; // force game fail
//                     }
//                     if(wrongSquare) {
//                         resetMemorySquaresArray();
//                         counter = 0;
//                         numberOfRounds.textContent = `${roundCount}`;
//                         if(roundCount >= highScore) {
//                             highScore = roundCount;
//                         }
//                         bestScore.textContent = `${highScore}`
//                     }
//                     if(counter == maxFlashCount) { 
//                         roundCount++;
//                         resetMemorySquaresArray();
//                         console.log(memorySquares);
//                         counter = 0;
//                         numberOfRounds.textContent = `${roundCount}`;
//                         if(roundCount >= highScore) {
//                             highScore = roundCount;
//                         }
//                         bestScore.textContent = `${highScore}`
//                     }
//             })
//            // }, 6000)
//         })
    
// }


start.addEventListener('click', beginGame);