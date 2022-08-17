const container = document.querySelector('#container');
const start = document.querySelector('#startBtn');
const reset = document.querySelector('#reset');
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
    box.addEventListener('click', function(){
            if(canYouClick){
                console.log(`memorySquares- ${memorySquares}`)
            if(memorySquares[counter] === parseInt(box.id)){
                box.classList.add('green');
                increaseCounter();
                console.log(`counter- ${counter}`);
            } else {
                console.log(`should be-${memorySquares[counter]}, you clicked-${box.id}}`)
                box.classList.add('red');
                canYouClick = false;
                resetCounter();
                numberOfRounds.textContent = `${roundCount}`;
                if(roundCount >= highScore) {
                    highScore = roundCount;
                }
                roundCount = 0;
                bestScore.textContent = `${highScore}`
            }
            if(counter == maxFlashCount) {
                canYouClick = false; 
                start.classList.remove('disable');
                roundCount++;
                resetMemorySquaresColor();
                console.log(memorySquares);
                resetCounter();
                numberOfRounds.textContent = `${roundCount}`;
                if(roundCount >= highScore) {
                    highScore = roundCount;
                }
                bestScore.textContent = `${highScore}`
            }
    }
})
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
    //console.log(memorySquares);
}

function getMemorySquares(squares) {
    memorySquares = squares;
}

function beginGame() {
    start.classList.add('disable'); // disable button while pattern is going
    squaresSequence();
    canYouClick = false;
    console.log(memorySquares)
    startPattern(memorySquares, 0, 0)
        .then(() => startPattern(memorySquares, 500, 1))
        .then(() => startPattern(memorySquares, 500, 2))
        .then(() => startPattern(memorySquares, 500, 3))
        .then(() => startPattern(memorySquares, 500, 4))

    removePattern(memorySquares, 500, 0)
        .then(() => removePattern(memorySquares, 500, 1)) 
        .then(() => removePattern(memorySquares, 500, 2))   
        .then(() => removePattern(memorySquares, 500, 3))   
        .then(() => removePattern(memorySquares, 500, 4))
        .then(() => youCanClick(true)) // after sequence you can click squares
}



let canYouClick = false;

function youCanClick(click) {
    canYouClick = click;
}
// handles squares initially changing color
const startPattern = (squares, delay, counter) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {  
                    let pick = document.getElementById(`${squares[counter]}`)
                    //pick.style.backgroundColor = color;
                    //pick.classList.remove('white')
                    pick.classList.add('black');
                    console.log(squares[counter])
                resolve();
        }, delay)
    })
}

// handles squares going back to white
const removePattern = (squares, delay, counter) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let pick = document.getElementById(`${squares[counter]}`)
          // pick.style.backgroundColor = 'white';
          pick.classList.remove('black');
          //pick.classList.add('white');
            resolve();
        }, delay)
    })
}

function resetMemorySquaresColor() {

    allSquares.forEach(square => square.classList.remove('white', 'red', 'green'));

   getMemorySquares([]);
}

let counter = 0;
let wrongSquare = false; 

// function that increases counter and returns that value to be called inside forEach function?

function increaseCounter() {
    counter++;
}

function resetCounter() {
    counter = 0;
}





function resetGame() {
    console.log('reseting game')
    numberOfRounds.textContent = '';
    memorySquares = [];
    start.classList.remove('disable');
    allSquares.forEach(square => square.classList.remove('white', 'green', 'red'));
}


start.addEventListener('click', beginGame);
reset.addEventListener('click', resetGame);



// allSquares.forEach(square => {   // THE SCOPE OF THE FOREACH LOOP
//     square.addEventListener('click', function() {
//             if(canYouClick){
//                  console.log(`square.id - ${square.id}, memorySquares- ${memorySquares}`)
//                  console.log(counter)
//                 //  console.log(`memory squares- ${memorySquares}`)
//             if(memorySquares[counter] === parseInt(square.id)){ //why is memorySquares undefined after 1st correct click after you fail a round
//                 console.log(`memorySquares- ${memorySquares[counter]} and square id ${square.id} `)
//                 //square.classList.remove('white')
//                 square.classList.add('green');
//                 //addGreenClass(square);
//                 console.log(square)
//                 counter++;
//                 console.log(counter);
//             } else {
//                 console.log(`${square.id} != ${memorySquares[counter]}`)
//                 square.classList.add('red');
//                 canYouClick = false;
//                 wrongSquare = true; // force game fail
//             }
//             // if you click the wrong square
//             if(wrongSquare) {
//                resetMemorySquaresColor();
//                //youCanClick(true);
//                 counter = 0;
//                 numberOfRounds.textContent = `${roundCount}`;
//                 if(roundCount >= highScore) {
//                     highScore = roundCount;
//                 }
//                 bestScore.textContent = `${highScore}`
//             }
//             // if you click every square correctly
//             if(counter == maxFlashCount) { 
//                 start.classList.remove('disable');
//                 roundCount++;
//                 resetMemorySquaresColor();
//                 console.log(memorySquares);
//                 counter = 0;
//                 numberOfRounds.textContent = `${roundCount}`;
//                 if(roundCount >= highScore) {
//                     highScore = roundCount;
//                 }
//                 bestScore.textContent = `${highScore}`
//             }
//         }
        
//     })

// })