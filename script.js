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
        } else {
            return -1;
        }



    }

    function checkWin(currentPlayer){

        winningCombos.some(combination =>{
            return combination.every(index=>board[index]==currentPlayer);
        });

    }

    function checkTie(){
        return gameboard.every(cell=>cell!=="");
    }

    function reset(){
        gameboard.fill("");
    }

    return { getBoard, placeMark, reset };

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

    function playRound(index) {
        if (getBoard().placeMark(index,activePlayer.mark)==-1) return;
        if (checkWin(activePlayer.mark)) return;
        if (checkTie()) return;
        activePlayer==playerOne ? activePlayer=playerTwo : activePlayer=playerOne;
    }

}