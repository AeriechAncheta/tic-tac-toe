import { useEffect, useState } from "react";
import "./App.css";
import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [status, setStatus] = useState("Next player: X");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    showResult()
  }, [squares]);

  const getImages = (arrayValue, arrayIndex) => {
    const imageStyle = {
      border: "2px solid black", // Add a black border
      height: "100%",
      width: "100%",
    };

    if (arrayValue === "X") {
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
    if (squares[arrayIndex] || calculateWinner(squares)) {
      setOpenDialog(true)
      return;
    }

    const updatedArray = [...squares];
    if (xIsNext) {
      updatedArray[arrayIndex] = "X";
    } else {
      updatedArray[arrayIndex] = "O";
    }
    setXIsNext(!xIsNext)
    setSquares(updatedArray);
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
      [2, 4, 6]
    ];
    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const showResult = () => {
    const winner = calculateWinner(squares);
  if (winner) {
    setOpenDialog(true)
    setStatus('Winner: ' + winner)
  } else {
    setStatus('Next player: ' + (xIsNext ? 'X' : 'O'))
  }

  let isDraw = true;
for (const square of squares) {
  if (square === null) {
    isDraw = false;
    break;
  }
}

if (isDraw) {
  setOpenDialog(true)
  setStatus("Draw");
}

    
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
    setOpenDialog(false)
  }

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
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
      >
        <DialogContent>
        <Typography>{status}</Typography>
          <Button onClick={(event) => resetGame()}>Play Again</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
