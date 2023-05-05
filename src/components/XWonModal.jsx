import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import startSound from "/sounds/startSound.mp3";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  bgcolor: "black",
  color: "aqua",
  border: "2px solid aqua",
  boxShadow: "0 0 10px aqua",
  p: 8,
};

export default function TransitionsModal({
  setBoard,
  setXWon,
  setGameBoard,
  setPlayingAgain,
  setXTurn,
}) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setXTurn(true);
    setPlayingAgain(true);
    setOpen(false);
    startAudio.play();
    setBoard([]);
    setXWon(false);
    setGameBoard();
  };
  const startAudio = new Audio(startSound);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} id="modal-box">
            <Typography id="transition-modal-title" variant="h4" component="h3">
              User X created the perfect system...
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 4 }}>
              Is the User ready to play again?
            </Typography>
            <button onClick={handleClose} id="start-btn">
              Restart System
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
