import { useEffect, useState } from "react";
import "./App.css";
import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [line, setLine] = useState(null);
  const [status, setStatus] = useState("Next player: X");

  useEffect(() => {
    showResult();
  }, [history[stepNumber].squares]);

  const current = history[stepNumber];
  const squares = current.squares.slice();

  const getImages = (arrayValue, arrayIndex) => {
    const imageStyle = {
      border: "2px solid black", // Add a black border
      height: "100%",
      width: "100%",
    };

    if (
      line != null &&
      winner ==
        "X" && (
          line[0] == arrayIndex ||
            line[1] == arrayIndex ||
            line[2] == arrayIndex
        )
    ) {
      return <img src="images/X-Winner-Image.png" alt="X" style={imageStyle} />;
    } else if (
      line != null &&
      winner ==
        "O" && (
          line[0] == arrayIndex ||
            line[1] == arrayIndex ||
            line[2] == arrayIndex
        )
    ) {
      return <img src="images/O-Winner-Image.png" alt="X" style={imageStyle} />;
    } else if (arrayValue === "X") {
      return <img src="images/X-Image.png" alt="X" style={imageStyle} />;
    } else if (arrayValue === "O") {
      return <img src="images/O-Image.png" alt="O" style={imageStyle} />;
    } else {
      return (
        <img
          src="images/White Image Background.jpeg"
          alt=" "
          style={imageStyle}
          onClick={() => handleSquareClick(arrayIndex)}
        />
      );
    }
  };

  const handleSquareClick = (arrayIndex) => {
    if (calculateWinner(squares) || squares[arrayIndex]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[arrayIndex] = xIsNext ? "X" : "O";

    setHistory(history.concat([{ squares: newSquares }]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

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
    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setLine(lines[index]);
        setWinner(squares[a]);
        return squares[a];
      }
    }
    setLine(null);
    setWinner(null);
    return null;
  };

  const showResult = () => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus("Winner: " + winner);
    } else {
      setStatus("Next player: " + (xIsNext ? "X" : "O"));
    }

    let isDraw = true;
    for (const square of squares) {
      if (square === null) {
        isDraw = false;
        break;
      }
    }

    if (isDraw) {
      setStatus("Draw");
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <Button onClick={() => jumpTo(move)}>{desc}</Button>
      </li>
    );
  });

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            {squares.map((array, index) => (
              <Grid item xs={4} md={4} key={index}>
                {getImages(array, index)}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>{status}</Typography>
          <ol>{moves}</ol>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
