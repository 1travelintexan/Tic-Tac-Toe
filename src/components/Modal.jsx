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

export default function TransitionsModal() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    startAudio.play();
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
              You will create the perfect system...
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 4 }}>
              User vs Program
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 4 }}>
              Are you ready?
            </Typography>
            <button onClick={handleClose} id="start-btn">
              Play
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
