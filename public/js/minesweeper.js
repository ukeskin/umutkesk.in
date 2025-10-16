// Minesweeper Game Logic
(function() {
  'use strict';

  let board = [];
  let revealed = [];
  let flagged = [];
  let gameOver = false;
  let gameWon = false;
  let firstClick = true;
  let timerInterval = null;
  let seconds = 0;
  let currentRow = 0;
  let currentCol = 0;
  let difficulty = 'easy';
  let ROWS = 8;
  let COLS = 8;
  let MINES = 10;

  // Announce messages for screen readers
  function announce(message) {
    const statusDiv = document.getElementById('game-status');
    if (statusDiv) {
      statusDiv.textContent = message;
    }
  }

  // Set difficulty level
  function setDifficulty(level) {
    difficulty = level;
    document.querySelectorAll('.difficulty-button').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });

    if (level === 'easy') {
      ROWS = 8;
      COLS = 8;
      MINES = 10;
      document.getElementById('btn-easy').classList.add('active');
      document.getElementById('btn-easy').setAttribute('aria-pressed', 'true');
    } else if (level === 'medium') {
      ROWS = 12;
      COLS = 12;
      MINES = 20;
      document.getElementById('btn-medium').classList.add('active');
      document.getElementById('btn-medium').setAttribute('aria-pressed', 'true');
    } else if (level === 'hard') {
      ROWS = 16;
      COLS = 16;
      MINES = 40;
      document.getElementById('btn-hard').classList.add('active');
      document.getElementById('btn-hard').setAttribute('aria-pressed', 'true');
    }

    resetGame();
  }

  // Initialize empty board
  function initializeBoard() {
    board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    revealed = Array(ROWS).fill(null).map(() => Array(COLS).fill(false));
    flagged = Array(ROWS).fill(null).map(() => Array(COLS).fill(false));
  }

  // Place mines on the board
  function placeMines(excludeRow, excludeCol) {
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      const row = Math.floor(Math.random() * ROWS);
      const col = Math.floor(Math.random() * COLS);

      // Don't place mine on first click or adjacent cells
      const isFirstClick = (row === excludeRow && col === excludeCol);
      const isAdjacent = Math.abs(row - excludeRow) <= 1 && Math.abs(col - excludeCol) <= 1;

      if (board[row][col] !== 'M' && !isFirstClick && !isAdjacent) {
        board[row][col] = 'M';
        minesPlaced++;
      }
    }

    // Calculate numbers for each cell
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (board[row][col] !== 'M') {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const newRow = row + dr;
              const newCol = col + dc;
              if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
                if (board[newRow][newCol] === 'M') count++;
              }
            }
          }
          board[row][col] = count;
        }
      }
    }
  }

  // Render the board
  function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${COLS}, 30px)`;
    boardElement.style.display = 'grid';
    boardElement.style.gap = '0';

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.setAttribute('role', 'gridcell');
        cell.setAttribute('aria-rowindex', row + 1);
        cell.setAttribute('aria-colindex', col + 1);
        cell.dataset.row = row;
        cell.dataset.col = col;

        // Generate accessible label
        let label = `Row ${row + 1}, Column ${col + 1}`;

        if (flagged[row][col]) {
          cell.textContent = '🚩';
          cell.classList.add('flagged');
          label += ', Flagged';
        } else if (revealed[row][col]) {
          cell.classList.add('revealed');
          if (board[row][col] === 'M') {
            cell.textContent = '💣';
            cell.classList.add('mine');
            label += ', Mine';
          } else if (board[row][col] > 0) {
            cell.textContent = board[row][col];
            cell.classList.add(`number-${board[row][col]}`);
            label += `, ${board[row][col]} adjacent mine${board[row][col] > 1 ? 's' : ''}`;
          } else {
            label += ', Empty';
          }
        } else {
          label += ', Hidden';
        }

        cell.setAttribute('aria-label', label);
        cell.tabIndex = (row === currentRow && col === currentCol) ? 0 : -1;

        if (row === currentRow && col === currentCol) {
          cell.setAttribute('aria-current', 'location');
        }

        cell.addEventListener('click', () => handleCellClick(row, col));
        cell.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          handleFlag(row, col);
        });

        boardElement.appendChild(cell);
      }
    }

    updateMineCounter();
  }

  // Handle cell click
  function handleCellClick(row, col) {
    if (gameOver || revealed[row][col] || flagged[row][col]) return;

    if (firstClick) {
      placeMines(row, col);
      firstClick = false;
      startTimer();
      announce('Game started. Good luck!');
    }

    currentRow = row;
    currentCol = col;
    revealCell(row, col);
  }

  // Reveal a cell
  function revealCell(row, col) {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return;
    if (revealed[row][col] || flagged[row][col]) return;

    revealed[row][col] = true;

    if (board[row][col] === 'M') {
      gameOver = true;
      revealAllMines();
      document.querySelector('.reset-button').textContent = '😵';
      stopTimer();
      announce('Game Over! You hit a mine. Press N to start a new game.');
      renderBoard();
      return;
    }

    const adjacentMines = board[row][col];
    if (adjacentMines > 0) {
      announce(`Revealed cell with ${adjacentMines} adjacent mine${adjacentMines > 1 ? 's' : ''}`);
    } else {
      announce('Revealed empty cell');
      // Auto-reveal adjacent cells
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          revealCell(row + dr, col + dc);
        }
      }
    }

    checkWin();
    renderBoard();
  }

  // Handle flag placement
  function handleFlag(row, col) {
    if (gameOver || revealed[row][col]) return;

    currentRow = row;
    currentCol = col;
    flagged[row][col] = !flagged[row][col];

    if (flagged[row][col]) {
      announce('Flag placed');
    } else {
      announce('Flag removed');
    }

    renderBoard();
  }

  // Reveal all mines (when game over)
  function revealAllMines() {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (board[row][col] === 'M') {
          revealed[row][col] = true;
        }
      }
    }
  }

  // Check if player won
  function checkWin() {
    let unrevealedCount = 0;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (!revealed[row][col] && board[row][col] !== 'M') {
          unrevealedCount++;
        }
      }
    }

    if (unrevealedCount === 0) {
      gameWon = true;
      gameOver = true;
      document.querySelector('.reset-button').textContent = '😎';
      stopTimer();
      announce(`Congratulations! You won in ${seconds} seconds! Press N to start a new game.`);
    }
  }

  // Update mine counter display
  function updateMineCounter() {
    let flagCount = 0;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (flagged[row][col]) flagCount++;
      }
    }
    const remaining = MINES - flagCount;
    document.getElementById('mine-counter').textContent = String(remaining).padStart(3, '0');
  }

  // Timer functions
  function startTimer() {
    seconds = 0;
    updateTimer();
    timerInterval = setInterval(() => {
      seconds++;
      updateTimer();
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function updateTimer() {
    document.getElementById('timer').textContent = String(Math.min(seconds, 999)).padStart(3, '0');
  }

  // Reset game
  function resetGame() {
    gameOver = false;
    gameWon = false;
    firstClick = true;
    currentRow = 0;
    currentCol = 0;
    seconds = 0;
    stopTimer();
    updateTimer();
    initializeBoard();
    renderBoard();
    document.querySelector('.reset-button').textContent = '🙂';
    announce('New game started. Navigate with arrow keys, press Space to reveal, F to flag.');
  }

  // Keyboard navigation
  function handleKeyDown(e) {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const focusedCell = document.activeElement;

    // New game
    if (e.key === 'n' || e.key === 'N') {
      resetGame();
      e.preventDefault();
      return;
    }

    if (!cells.includes(focusedCell)) return;

    const row = parseInt(focusedCell.dataset.row);
    const col = parseInt(focusedCell.dataset.col);

    let newRow = row;
    let newCol = col;

    switch(e.key) {
      case 'ArrowUp':
        newRow = Math.max(0, row - 1);
        e.preventDefault();
        break;
      case 'ArrowDown':
        newRow = Math.min(ROWS - 1, row + 1);
        e.preventDefault();
        break;
      case 'ArrowLeft':
        newCol = Math.max(0, col - 1);
        e.preventDefault();
        break;
      case 'ArrowRight':
        newCol = Math.min(COLS - 1, col + 1);
        e.preventDefault();
        break;
      case ' ':
        handleCellClick(row, col);
        e.preventDefault();
        return;
      case 'f':
      case 'F':
        handleFlag(row, col);
        e.preventDefault();
        return;
      default:
        return;
    }

    currentRow = newRow;
    currentCol = newCol;
    const newCell = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
    if (newCell) {
      newCell.focus();
      renderBoard();
    }
  }

  // Initialize game when DOM is ready
  function init() {
    // Make functions available globally
    window.setDifficulty = setDifficulty;
    window.resetGame = resetGame;

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

    // Initialize game
    resetGame();

    // Set initial focus
    setTimeout(() => {
      const firstCell = document.querySelector('[data-row="0"][data-col="0"]');
      if (firstCell) firstCell.focus();
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
