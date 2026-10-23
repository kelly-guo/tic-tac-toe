const Gameboard = (()=> {
    const gameboard= ["","","","","","","","",""];
    const winningCombos = [
        [0,1,2], [3,4,5],[6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8],[2,4,6]
    ];

    function getBoard(){
        return gameboard;
    }

    function placeMark(index,mark){

        if (gameboard[index]==""){
            gameboard[index]=mark;
            return true;
        } else {
            return false;
        }



    }

    function checkWin(mark){

        winningCombos.some(combination =>{
            return combination.every(index=>gameboard[index]==mark);
        });

    }

    function checkTie(){
        return gameboard.every(cell=>cell!=="");
    }

    function reset(){
        gameboard.fill("");
    }

    return { getBoard, placeMark, reset, checkWin, checkTie };

});

function Player(name, mark){

    return {
        name,
        mark
    };

}

function Game(name1,name2){
    const playerOne = Player(name1,"O");
    const playerTwo = Player(name2,"X");

    let activePlayer = playerOne;
    let gameOver = false;
    let result = "";

    function playRound(index) {
        if (gameOver) return;
        if (!gameboard.placeMark(index,activePlayer.mark)) return;
        if (gameboard.checkWin(activePlayer.mark)) {
            gameOver=true;
            result='Player ${activePlayer.name} wins!'
            return;
        }
        if (gameboard.checkTie()) {
            gameOver=true;
            result='The game ends in a tie!'
            return;
        }
        activePlayer= activePlayer===playerOne ? playerTwo : playerOne;
    }

    return {
        playRound, getActivePlayer: () =>activePlayer, isOver: () => gameOver, getResult: () => result
    }

};

const DisplayController = (()=>{

const startBtn=document.querySelector(".start-button");
const restartBtn=document.querySelector(".restart-button");
const name1=document.getElementById("name1");
const name2=document.getElementById("name2");

const tiles = document.getElementsByClassName("tile");
const status = document.querySelector(".status-msg");

let game = null;

function render(){
    const board = Gameboard.getBoard();
    tiles.forEach((tile,i)=>{
        tile.textContent=board[i];
    });

    if (!game){
        status.textContent="Enter names and press start"
    } else if (game.isOver){
        status.textContent=game.getResult();
    } else {
        status.textContent=`${game.getActivePlayer().name}'s turn`;
    }
}

function startGame(){
    Gameboard.reset();
    game = new Game(name1.value,name2.value);
    render();

}
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

tiles.forEach((tile,i)=>{
        tile.addEventListener("click", ()=> {

            if (!game) return;
            game.playRound(i);
            render();

        });
    });

    render();

})();

