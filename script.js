
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const gameStatus = document.getElementById('game-status');
const messageBox = document.getElementById('message-box');
const message = document.getElementById('message');
const closeButton = document.getElementById('close-button');
const background = document.querySelector('.background');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const createBackgroundSquares = () => {
    const squareCount = Math.ceil(window.innerWidth / 50) * Math.ceil(window.innerHeight / 50);
    for (let i = 0; i < squareCount; i++) {
        const square = document.createElement('div');
        background.appendChild(square);
    }
};

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        gameStatus.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        showMessageBox(`${currentPlayer} wins!`);
        return;
    }

    if (!gameState.includes('')) {
        gameStatus.textContent = 'Draw!';
        gameActive = false;
        showMessageBox('Draw!');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
};

const checkWin = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
};

const resetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    messageBox.style.display = 'none';
};

const showMessageBox = (msg) => {
    message.textContent = msg;
    messageBox.style.display = 'block';
};

createBackgroundSquares();
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
closeButton.addEventListener('click', resetGame);
