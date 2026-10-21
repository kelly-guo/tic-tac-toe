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

const startBtn=document.querySelector(".start-button");
var name1=document.getElementById("name1").value;
var name2=document.getElementById("name2").value;

startBtn.addEventListener("click", function (){

    var name1=document.getElementById("name1").value;
    var name2=document.getElementById("name2").value;

    const board= new Gameboard();
    const game = Game(name1,name2);



});

const restartBtn=document.querySelector(".restart-button");

restartBtn.addEventListener("click", function (){

    const board= new Gameboard();
    const game = Game(name1,name2);



});