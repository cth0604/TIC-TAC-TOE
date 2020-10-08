const game = (() => {
    let isX = true;
    const changeTurn = function() {
        isX = !isX;
    };
    const getIsX = function() {
        return isX;
    }
    const displayResult = function() {
        //***
    } 
    const restart = function() {
        isX = true;
        gameBoard.resetBoard();
    }
    return {
        restart,
        getIsX,
        changeTurn,
        displayResult,
    };
})();

const gameBoard = (() => {
    let _board = [false, false, false, false, false, false, false, false, false];
    const _checkOver = function() {
        //***
    };
    const _render = function() {
        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < 9; i++) {
            if (_board[i]) {
                cells[i].textContent = _board[i];
            }
        }
    };
    const resetBoard = function() {
        _board = _board.map(cell => false);
        _render();
    }
    const mark = function(index) {
        if (!_board[index]) {
            _board[index] = game.getIsX ? 'X' : 'O'
            _render();
            if (_checkOver()) {
                game.displayResult();
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
    const play = function(e) {
        const index = Number(e.target.dataset.index);
        gameBoard.mark(index);
    }
    return {
        name,
        isBot,
        play,
    }
}

