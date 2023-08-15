import React, { useEffect, useState } from "react";
import "./App.css";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { center } from "./style";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const StyledSquare = ({ arrayValue, arrayIndex, line, winner, handleSquareClick }) => {
  const imageStyle = {
    border: "2px solid black",
    height: "130px",
    width: "100%",
  };

  if (
    line != null &&
    ((winner === "X" || winner === "O") &&
      (line[0] === arrayIndex ||
        line[1] === arrayIndex ||
        line[2] === arrayIndex))
  ) {
    const winnerImage = winner === "X" ? "X-Winner-Image.png" : "O-Winner-Image.png";
    return <img src={`images/${winnerImage}`} alt={winner} style={imageStyle} />;
  } else if (arrayValue === "X" || arrayValue === "O") {
    return <img src={`images/${arrayValue}-Image.png`} alt={arrayValue} style={imageStyle} />;
  } else {
    return (
      <img
        src="images/White-Image-Background.jpeg"
        alt=" "
        style={imageStyle}
        onClick={() => handleSquareClick(arrayIndex)}
      />
    );
  }
};

const MovesList = ({ history, handleSetStep }) => {
  return (
    <Box p={2} height="100%" display="flex" flexDirection="column" justifyContent="center">
      <Typography variant="h6" mb={2}>
        Move History
      </Typography>
      <Box overflow="auto" maxHeight="60vh">
        <ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
          {history.map((step, move) => (
            <li key={move}>
              <Button
                onClick={() => handleSetStep(move)}
                variant="outlined"
                size="small"
                fullWidth
              >
                {move ? `Go to move #${move}` : "Go to game start"}
              </Button>
            </li>
          ))}
        </ol>
      </Box>
    </Box>
  );
};

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

  const handleSetStep = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const resetGame = () => {
    setXIsNext(true);
    setWinner(null);
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setLine(null);
    setStatus("Next player: X");
  };

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
                  <StyledSquare
                    arrayValue={array}
                    arrayIndex={index}
                    line={line}
                    winner={winner}
                    handleSquareClick={handleSquareClick}
                  />
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
          <Box border={2} borderColor="black">
            <MovesList history={history} handleSetStep={handleSetStep} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
