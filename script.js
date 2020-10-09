const game = (() => {
    let _isX = true;
    let _isDone = false;
    const _updateNames = function () {
        const playerOneName = document.querySelector('#playerOneName');
        const playerTwoName = document.querySelector('#playerTwoName');
        const playerOneNameDisplay = document.querySelector('#playerOne');
        const playerTwoNameDisplay = document.querySelector('#playerTwo');
        if (playerOneName.value !== '') {
            console.log(playerOneNameDisplay);
            playerOneNameDisplay.innerHTML = playerOneName.value + ' (X)';
            playerOne = Player(playerOneName.value, false);
        }
        if (playerTwoName.value !== '') {
            playerTwoNameDisplay.innerHTML = playerTwoName.value + ' (O)';
            playerTwo = Player(playerTwoName.value, false);
        }
    }
    const changeTurn = function () {
        _isX = !_isX;
        const playerOne = document.querySelector('#playerOne');
        const playerTwo = document.querySelector('#playerTwo');
        playerOne.classList.toggle('highlight');
        playerTwo.classList.toggle('highlight');
    };
    const getIsX = function () {
        return _isX;
    }
    const getIsDone = function () {
        return _isDone;
    }
    const displayResult = function (result = 'not tie') {
        const playerOne = document.querySelector('#playerOne');
        const playerTwo = document.querySelector('#playerTwo');
        if (result === 'tie') {
            playerOne.innerHTML = 'It\'s a tie!';
            playerTwo.innerHTML = '';
        } else {
            if (_isX) {
                playerOne.innerHTML += ', Victory!';
                playerTwo.innerHTML += ', Defeat...';
            } else {
                playerOne.innerHTML += ', Defeat...';
                playerTwo.innerHTML += ', Victory!...';
            }
        }
        _isDone = true;
    }
    const start = function () {
        //***
        const form = document.querySelector('.contact-us');
        form.classList.add('hide');
        const gameDisplay = document.querySelector('.game-display');
        gameDisplay.classList.remove('hide');
        _updateNames();
    }
    const restart = function () {
        _isDone = false;
        _isX = true;
        gameBoard.resetBoard();
        const playerOneNameDisplay = document.querySelector('#playerOne');
        const playerTwoNameDisplay = document.querySelector('#playerTwo');
        playerOneNameDisplay.innerHTML = playerOne.name;
        playerTwoNameDisplay.innerHTML = playerTwo.name;
    }
    return {
        start,
        restart,
        getIsX,
        changeTurn,
        displayResult,
        getIsDone,
    };
})();

const gameBoard = (() => {
    let _board = [false, false, false, false, false, false, false, false, false];
    let p1Rows = [0, 0, 0];
    let p1Columns = [0, 0, 0];
    let p2Rows = [0, 0, 0];
    let p2Columns = [0, 0, 0];
    let p1Dig = [0, 0];
    let p2Dig = [0, 0];
    const _checkOver = function () {
        const checkThree = function (element, index, array) {
            return element === 3;
        };
        if (game.getIsX()) {
            if (p1Rows.some(checkThree) || p1Columns.some(checkThree) || p1Dig.some(checkThree)) {
                return true;
            }
        } else {
            if (p2Rows.some(checkThree) || p2Columns.some(checkThree) || p2Dig.some(checkThree)) {
                return true;
            }
        }
        if (_board.every(element => element !== false)) {
            return 'tie';
        }
        return false;
    };
    const _render = function () {
        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < 9; i++) {
            if (_board[i]) {
                cells[i].textContent = _board[i];
            } else {
                cells[i].textContent = '';
            }
        }
    };
    const _getRowAndColIndices = function (index) {
        let rowIndex;
        let columIndex;
        if (index < 3) {
            rowIndex = 0;
            columIndex = index;
        } else if (index < 6) {
            rowIndex = 1;
            columIndex = index - 3;
        } else {
            rowIndex = 2;
            columIndex = index - 6;
        }
        return [rowIndex, columIndex];
    }
    const _updateRowAndColIndices = function (index) {
        const [rowIndex, colIndex] = _getRowAndColIndices(index);
        if (game.getIsX()) {
            p1Rows[rowIndex]++;
            p1Columns[colIndex]++;
            if (rowIndex === colIndex) {
                p1Dig[0]++;
            }
            if (rowIndex + colIndex + 1 === 3) {
                p1Dig[1]++;
            }
        } else {
            p2Rows[rowIndex]++;
            p2Columns[colIndex]++;
            if (rowIndex === colIndex) {
                p2Dig[0]++;
            }
            if (rowIndex + colIndex + 1 === 3) {
                p2Dig[1]++;
            }
        }
    }
    const resetBoard = function () {
        _board = _board.map(cell => false);
        _render();
        [p1Rows, p1Columns, p1Dig, p2Rows, p2Columns, p2Dig].forEach(array => array.forEach(function (part, index, array) {
            array[index] = 0;
        }));
    }
    const mark = function (e) {
        const index = Number(e.target.dataset.index);
        if (!_board[index] && !game.getIsDone()) {
            _board[index] = game.getIsX() ? 'X' : 'O'
            _render();
            _updateRowAndColIndices(index);
            isOver = _checkOver()
            if (isOver) {
                if (isOver === 'tie') {
                    game.displayResult('tie');
                } else {
                    game.displayResult();
                }
            } else {
                game.changeTurn();
            };
        }
    };
    return {
        resetBoard,
        mark,
    };
})();

const Player = (name, isBot) => {
    return {
        name,
        isBot,
    }
}

let playerOne = Player('Player 1', false);
let playerTwo = Player('Player 2', false);

const startButton = document.querySelector('.start');
startButton.addEventListener('click', game.start);

const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => cell.addEventListener('click', gameBoard.mark));

const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', game.restart);