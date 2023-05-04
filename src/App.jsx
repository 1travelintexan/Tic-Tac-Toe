import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [board, setBoard] = useState(null);
  const [xTurn, setXTurn] = useState(true);
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

  const handleClick = (e) => {
    let squareId = e.target.id;
    let copyBoard = JSON.parse(JSON.stringify(board));
    copyBoard.map((row, i) => {
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

  return (
    <div>
      <h1 className="heading">Tic-Tac-Tron</h1>
      <div id="board-container">
        {board &&
          board.map((row, rowIndex) => {
            return row.map((square, index) => {
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
