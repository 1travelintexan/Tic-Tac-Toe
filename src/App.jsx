import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import startSound from "/sounds/startSound.mp3";
import moveSound from "/sounds/moveSound.mp3";
function App() {
  const [board, setBoard] = useState([]);
  const [xTurn, setXTurn] = useState(true);
  const [xWon, setXWon] = useState(false);
  const [oWon, setOWon] = useState(false);
  const startAudio = new Audio(moveSound);
  useEffect(() => {
    const firstBoard = [];
    let arr = [];
    for (let i = 1; i <= 9; i++) {
      arr.push({ player: null, index: i });
      if (i % 3 === 0) {
        firstBoard.push(arr);
        arr = [];
      }
    }
    setBoard(firstBoard);
  }, []);
  useEffect(() => {
    if (!xTurn) {
      let didXWin = checkIfSomeoneWon("X");
      if (didXWin) {
        setXWon(true);
      }
    } else {
      let didOWin = checkIfSomeoneWon("O");
      if (didOWin) {
        setOWon(true);
      }
    }
  }, [xTurn]);

  const handleClick = (e) => {
    startAudio.play();
    let squareId = e.target.id;
    let copyBoard = JSON.parse(JSON.stringify(board));
    copyBoard.map((row) => {
      row.map((square) => {
        if (square.index == squareId) {
          if (xTurn) {
            square.player = "X";
          } else {
            square.player = "O";
          }
        }
      });
    });
    setBoard(copyBoard);
    setXTurn(!xTurn);
  };

  const checkRows = (element) => {
    let won = false;
    board.forEach((row) => {
      let winning = 0;
      row.forEach((e) => {
        console.log("here", e, element);
        if (e.player === element) {
          winning++;
        }
      });
      if (winning === 3) {
        won = true;
      }
    });
    return won;
  };

  const checkCols = (element) => {
    let won = false;
    let winning = {};
    board.forEach((col) => {
      col.forEach((e, i2) => {
        if (e.player === element) {
          winning[i2] = winning[i2] + 1 || 1;
        }
      });
    });
    for (let index in winning) {
      if (winning[index] === 3) {
        console.log(`${element} won on column ${+index + 1}`);
        return true;
      }
    }
    return won;
  };

  const checkDiagonals = (element) => {
    if (
      (board[0][0].player === element &&
        board[1][1].player === element &&
        board[2][2].player) ||
      (board[0][2].player === element &&
        board[1][1].player === element &&
        board[2][0].player === element)
    ) {
      console.log(`${element} won on a diagonal`);
      return true;
    }
    return false;
  };

  const checkIfSomeoneWon = (element) => {
    if (board.length === 3 && board[0][0].player) {
      let rows = checkRows(element);
      let cols = checkCols(element);
      let diags = checkDiagonals(element);

      console.log(rows, cols, diags);
      if (rows || cols || diags) {
        console.log(`${element} won!`);
        return true;
      }
    }
  };

  return (
    <div id="page">
      <h1 className="heading">Tic-Tac-Tron</h1>
      <div id="board-container">
        {board &&
          board.map((row) => {
            return row.map((square) => {
              return (
                <div
                  key={uuidv4()}
                  className="square"
                  id={square.index}
                  onClick={handleClick}
                >
                  <h1 id="move">{square.player}</h1>
                </div>
              );
            });
          })}
      </div>
    </div>
  );
}

export default App;
