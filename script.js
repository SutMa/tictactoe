const gameBoard  = (function(){
    let gameArray = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    let playerTurns = 1;

    function updatePlayer1(row, column){
        gameArray[row][column] = 1 ;
        playerTurns = 2;
    }

    function updatePlayer2(row, column){
        gameArray[row][column] = 2;
        playerTurns = 1;
    }

    function resetGame(){
        gameArray = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]
    }

    function checkWinner() {
        // Check rows and columns
        for (let i = 0; i < 3; i++) {
            if (gameArray[i][0] === gameArray[i][1] && gameArray[i][1] === gameArray[i][2] && gameArray[i][0] !== 0) {
                return gameArray[i][0]; // Player 1 or 2 wins with a row
            }
            if (gameArray[0][i] === gameArray[1][i] && gameArray[1][i] === gameArray[2][i] && gameArray[0][i] !== 0) {
                return gameArray[0][i]; // Player 1 or 2 wins with a column
            }
        }
    
        // Check diagonals
        if (gameArray[0][0] === gameArray[1][1] && gameArray[1][1] === gameArray[2][2] && gameArray[0][0] !== 0) {
            return gameArray[0][0]; // Player 1 or 2 wins with top-left to bottom-right diagonal
        }
        if (gameArray[0][2] === gameArray[1][1] && gameArray[1][1] === gameArray[2][0] && gameArray[0][2] !== 0) {
            return gameArray[0][2]; // Player 1 or 2 wins with top-right to bottom-left diagonal
        }
    
        // Check for tie
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameArray[i][j] === 0) {
                    return null; // The game is not yet over
                }
            }
        }
    
        return 0; // It's a tie since all spots are filled and no one has won
    }

    function checkGameStatus(row, column){
        if (gameArray[row][column] == 1 || gameArray[row][column] == 2) {
            return false;
        }else if (gameArray[row][column] == 0 ){
            return true;
        }
    }
    
    function getPlayerTurn(){
        return playerTurns;
    }

    return {
        updatePlayer1, 
        updatePlayer2, 
        resetGame, 
        checkWinner, 
        checkGameStatus, 
        getPlayerTurn
    };

})();

let gridItems = document.querySelectorAll('.grid-items');

gridItems.forEach(item => {
    item.addEventListener('click', (event) => {
        playGame(event.target.id, event);
    });
});


function playGame(id, event){
    // Extract row and column from the id
    const [row, column] = id.match(/\d+/g).map(Number);

    if (gameBoard.checkGameStatus(row, column)) {
        const playerTurn = gameBoard.getPlayerTurn();
        if(playerTurn == 1){
            gameBoard.updatePlayer1(row, column);
            event.target.textContent = 'X';
        } else if(playerTurn == 2){
            gameBoard.updatePlayer2(row, column);
            event.target.textContent = 'O';
        }

        const winner = gameBoard.checkWinner();
        if (winner === 1) {
            alert("Player 1 wins!");
            gameBoard.resetGame();
            clearBoardDisplay();
        } else if (winner === 2) {
            alert("Player 2 wins!");
            gameBoard.resetGame();
            clearBoardDisplay();
        } else if (winner === 0) {
            alert("It's a tie!");
            gameBoard.resetGame();
            clearBoardDisplay();
        }
    }
}


function clearBoardDisplay() {
    gridItems.forEach(item => item.textContent = '');
}