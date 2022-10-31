import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {FacebookShareButton ,WhatsappShareButton} from "react-share"
import {FacebookIcon, WhatsappIcon} from "react-share"
import ContentCopyIcon  from "@mui/icons-material/ContentCopy";



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

const icons ={
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  gap:"15px",
  
}

export default function ShareModal({ open, setOpen,url }) {
  const [text,setText] = useState("Copy")
  const handleClose = () => {
    setOpen(false);
    setText("Copy")
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
            <Typography gutterBottom style={{marginBottom:"10px", textAlign:"center"}}>Share video with your friends</Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
             <Box style={icons}>
              <FacebookShareButton
              url={url}
              quote="Hey checkout this video on Electronn"
              >
                <FacebookIcon logofillColor="white" size={40} round={true}/>
              </FacebookShareButton>
              <Typography>Facebook</Typography>
             </Box>
             <Box style={icons}>
              <WhatsappShareButton
              url={url}
              title="Hey checkout this video on Electronn"
              >
                <WhatsappIcon logofillColor="white" size={40} round={true}/>
              </WhatsappShareButton>
                <Typography>Whatsapp</Typography>
             </Box>
             <Box style={icons}>
              <IconButton
              onClick={() => {navigator.clipboard.writeText(url).then(setText("Copied"))}}
              >
                <ContentCopyIcon style={{fontSize:"30px"}}/>
              </IconButton>
                <Typography>{text}</Typography>
             </Box>

            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
