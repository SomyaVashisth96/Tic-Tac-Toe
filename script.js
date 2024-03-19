let gameInfo = document.querySelector(".gameInfo")
let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Let's create a function to initialize the game
function initializeGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // make the UI grid also empty
    boxes.forEach((box , index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // Initializing all the CSS properties so that we get a clear grid
        box.classList = `box box${index + 1}`;
        });
    
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initializeGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`; 
}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) => {
        // All three boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] ===  gameGrid[position[1]]) &&(gameGrid[position[1]] === gameGrid[position[2]])) 
        {   
            if(gameGrid[position[0]] === "X"){
                answer = "X";

            }   
            else{
                answer = "O";
            } 
            // We have got the winner so we have to disable box clicks so that further game is not active .
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // Now we have our winner so we will change the color of the boxes 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // 
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Check if there is a tie 
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    // Till now fillCount would be 9 as 9 grids are filled
    if(fillCount === 9){
        gameInfo.innerText = "Game tied !";
        newGameBtn.classList.add("active")
    }

}

function handleClick(index){
    if(gameGrid[index] === ""){
        // This brings changes in the UI
        boxes[index].innerText = currentPlayer; 
        // By this statement we are checking the status of this game
        gameGrid[index] = currentPlayer; 
        // When a grid is already filled then the cursor shouldn't be pointer
        boxes[index].style.pointerEvents = "none";
        // Swap the current player
        swapTurn();
        // Check if someone has won the game
        checkGameOver();
    }
}

boxes.forEach((box , index) => {
    box.addEventListener("click" , () =>{
        handleClick(index);
    });
});

newGameBtn.addEventListener("click" ,initializeGame);