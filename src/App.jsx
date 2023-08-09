import { useEffect, useState } from "react";
import "./App.css";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { center } from "./style";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [line, setLine] = useState(null);
  const [status, setStatus] = useState("Next player: X");
  const current = history[stepNumber];
  const squares = current.squares.slice();

  useEffect(() => {
    handleSetGameStatus();
  }, [history[stepNumber].squares]);

  //Function to show specific image in each square
  const showSquareImages = (arrayValue, arrayIndex) => {
    const imageStyle = {
      border: "2px solid black",
      height: "130px",
      width: "100%",
    };

    if (
      line != null &&
      winner === "X" &&
      (line[0] === arrayIndex ||
        line[1] === arrayIndex ||
        line[2] === arrayIndex)
    ) {
      return <img src="images/X-Winner-Image.png" alt="X" style={imageStyle} />;
    } else if (
      line != null &&
      winner === "O" &&
      (line[0] === arrayIndex ||
        line[1] === arrayIndex ||
        line[2] === arrayIndex)
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

  //Function to handle what to do when squares are clicked
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

  //Function to calculate all posible lines to win in tic tac toe
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
    for (const line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setLine(line);
        setWinner(squares[a]);
        return squares[a];
      }
    }

    setLine(null);
    setWinner(null);
    return null;
  };

  //Function To set what is the game status
  const handleSetGameStatus = () => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus("Winner: " + winner);
      return;
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

  //Function to set move or step
  const handleSetStep = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  //Function to reset game from start
  const resetGame = () => {
    setXIsNext(true);
    setWinner(null);
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setLine(null);
    setStatus("Next player: X");
  };

  //Function to show moves that have been done
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <Button onClick={() => handleSetStep(move)}>{desc}</Button>
      </li>
    );
  });

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <SportsEsportsIcon sx={{ mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Tic Tac Toe
          </Typography>
        </Container>
      </AppBar>
      <Typography variant="h3" marginTop={1} marginBottom={1} sx={center}>
        {status}
      </Typography>

      <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Box border={2} borderColor="black">
              <Grid container spacing={2} padding={2} sx={center}>
                {squares.map((array, index) => (
                  <Grid item xs={4} md={4} key={index}>
                    {showSquareImages(array, index)}
                  </Grid>
                ))}
                <Button
                  variant="contained"
                  onClick={(event) => resetGame()}
                  sx={{ marginLeft: "25px", marginTop: "10px" }}
                >
                  Reset Game
                </Button>
              </Grid>
            </Box>
          </Grid>
        <Grid item xs={12} md={6}>
          <ol>{moves}</ol>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
