import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';


const Square = (props) => {
      return (
          <button
              className="square"
              onClick={props.onClick}
          >
              {props.value}
          </button>
      );
}

const Board = (props) => {

  const renderSquare = (i)  => {
      return <Square
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
      />;
  }
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}


const Game = (props) => {
    const [history, setHistory] = useState([{squares: Array(9).fill(null),}
    ]
    );
    const [isX, setIsX] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const handleClick = (i) => {
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = isX ? 'X' : 'O';
        setHistory(prevState => [...prevState, {squares: squares}]);
        setIsX(prevState => !prevState);
    }

    const winner = calculateWinner(history[history.length - 1].squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (isX ? 'X' : 'O');
    }

    const jumpTo = (i) => {
        setHistory(prevState => [...prevState.filter((step, index) => index <= i)]);
        setIsX(i % 2 === 0)
    }

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });


    const current = history[history.length - 1];
    return (
    <div className="game">
        <div className="game-board">
          <Board onClick={(i) => handleClick(i)} squares={current.squares}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
  );
}

// ========================================

ReactDOM.render(
  <React.StrictMode>
  <Game />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();