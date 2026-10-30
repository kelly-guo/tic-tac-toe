const Gameboard = (() => {
    const gameboard = ["", "", "", "", "", "", "", "", ""];
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const getBoard = () => [...gameboard];

    function placeMark(index, mark) {
        if (gameboard[index] !== "") return false;
        gameboard[index] = mark;
        return true;
    }

    function checkWin(mark) {
        return winningCombos.some(combo =>
            combo.every(i => gameboard[i] === mark)
        );
    }

    const checkTie = () => gameboard.every(cell => cell !== "");
    const reset = () => gameboard.fill("");

    return { getBoard, placeMark, reset, checkWin, checkTie };
})();                                   // <-- the () at the end matters

function Player(name, mark) {
    return { name, mark };
}

function Game(name1, name2) {
    const playerOne = Player(name1 || "Player 1", "X");
    const playerTwo = Player(name2 || "Player 2", "O");

    let activePlayer = playerOne;
    let gameOver = false;
    let result = "";

    function playRound(index) {
        if (gameOver) return;
        if (!Gameboard.placeMark(index, activePlayer.mark)) return;

        if (Gameboard.checkWin(activePlayer.mark)) {
            gameOver = true;
            result = `${activePlayer.name} wins!`;
            return;
        }
        if (Gameboard.checkTie()) {
            gameOver = true;
            result = "The game ends in a tie!";
            return;
        }
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    return {
        playRound,
        getActivePlayer: () => activePlayer,
        isOver: () => gameOver,
        getResult: () => result
    };
}

const DisplayController = (() => {
    const startBtn = document.querySelector(".start-button");
    const restartBtn = document.querySelector(".restart-button");
    const name1 = document.getElementById("name1");
    const name2 = document.getElementById("name2");
    const tiles = document.querySelectorAll(".tile");      // <-- NodeList
    const statusMsg = document.querySelector(".status-msg");

    let game = null;

    function render() {
        const board = Gameboard.getBoard();
        tiles.forEach((tile, i) => {
            tile.textContent = board[i];
            tile.classList.remove("x", "o");   
            if (board[i]=="X") {
                tile.classList.add("x");
              
            }
            if (board[i]=="O") {
                tile.classList.add("o");
               
            }
            
        });

        statusMsg.classList.remove("x", "o");
        var current = game && !game.isOver() ? game.getActivePlayer() : null


        name1.classList.toggle("active", !!current && current.mark === "X");
        name2.classList.toggle("active", !!current && current.mark === "O");

        if (!game) {
            statusMsg.textContent = "Enter names and press start";
        } else if (game.isOver()) {                         // <-- called
            statusMsg.textContent = game.getResult();
        } else {
            statusMsg.textContent = `${game.getActivePlayer().name}'s turn`;
            statusMsg.classList.add(game.getActivePlayer().mark.toLowerCase()); //class x or o

        }
    }

    function startGame() {
        Gameboard.reset();
        game = Game(name1.value, name2.value);              // no `new` needed
        render();
    }

    startBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", startGame);

    tiles.forEach((tile, i) => {
        tile.addEventListener("click", () => {
            if (!game) return;
            game.playRound(i);
            render();
        });
    });

    render();
})();