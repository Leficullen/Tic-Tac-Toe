import { useState } from 'react'

function Square ({value, onSquareClick}) {

  return <button className='square' onClick={onSquareClick}>{value}</button>
}

function Board({xTurn, squares, onPlay}) {
  function handleClick (i) {
    if (squares[i] || calculateWinners(squares)) return;

    const nextSquares = squares.slice();

    nextSquares[i] = xTurn ? 'X':'O';
    
    onPlay(nextSquares);

  }

  const winner = calculateWinners(squares);
  let status = '';
  if (winner) {
    status = `${winner} is the winner`;
  } else if (squares.every(x => x !== null)) {
    status = `Draw!`
    
  } else {
    status = `Turn: ${xTurn ? 'X' : 'O'}`;

  }
  return (
    <>
      <div className='board'>
        <Square value={squares[0]} onSquareClick={()=>  handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>  handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>  handleClick(2)}/>
        <Square value={squares[3]} onSquareClick={()=>  handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>  handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>  handleClick(5)}/>
        <Square value={squares[6]} onSquareClick={()=>  handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>  handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=>  handleClick(8)}/>
      </div>
      <div className='status'>{status}</div>
    </>

  )

}

export default function Game () {
  const [xTurn,setXTurn] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXTurn(nextMove % 2 === 0);
  }

  function handlePlay (nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
    setXTurn(!xTurn);
  }

  const moves = history.map((squares, move) => {
    let description = '';
    if (move>0) {
      description = `Go to #${move} Move `;
    } else {
      description = `Go to Game Start`;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )

  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xTurn={xTurn} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinners(squares) {
  const lines = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] &&  squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
 
}

