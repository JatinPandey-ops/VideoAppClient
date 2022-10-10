import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import React from "react";
import { Twitter } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const iconStyle = {
  fontSize: "20px",
};

export default function ShareModal({ open, setOpen,url }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Box>
                <Stack alignItems="Center">
                    <WhatsAppIcon sx={{ iconStyle }} />
                  <Typography fontSize="small">Whatsapp</Typography>
                </Stack>
              </Box>
              <Box>
                <Stack alignItems="Center">
                  <IconButton>
                    <FacebookOutlinedIcon sx={{ iconStyle }} />
                  </IconButton>
                  <Typography fontSize="small">Facebook</Typography>
                </Stack>
              </Box>
              <Box>
                <Stack alignItems="Center">
                  <IconButton>
                    <Twitter sx={{ iconStyle }} />
                  </IconButton>
                  <Typography fontSize="small">Twitter</Typography>
                </Stack>
              </Box>
              <Box>
                <Stack alignItems="Center">
                  <IconButton>
                    <ContentPasteOutlinedIcon sx={{ iconStyle }} />
                  </IconButton>
                  <Typography fontSize="small">Clipboard</Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
