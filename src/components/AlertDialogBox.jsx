import React from "react";
import { AlertContext } from "../context/AlertContext";
import { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { app } from "../Firebase";     

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
const btnStyle = {
  width: "50%",
};

export default function AlertDialogBox() {
  const alertContext = useContext(AlertContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const deleteFile = (file,folder) => {
    const storage = getStorage(app)
    const storageref = ref(storage , folder + file)
  deleteObject(storageref).then(() => {
      console.log("file deleted")
    } ).catch((error) => {
      console.log(error)
    });
  }

  const triggerLogout = async () => {
    await axios.get("auth/logout", { withCredentials: true });
    dispatch(logout());
    navigate("/");
    alertContext.setOpen(false);
    alertContext.setRes(false);
  };

  const handleClose = () => {
    alertContext.setOpen(false);
  };
  const handleDelete = async () => {
    deleteFile( alertContext?.details?.videoName,"Videos/") 
    await axios.delete(`video/${alertContext?.details?.path}`,{withCredentials:true})
    navigate("/manage")}


  const renderBtn = () => {
    if (alertContext.type === "logout") {
      return (
        <>
          <Button variant="contained" onClick={handleClose} sx={btnStyle}>
            Cancel
          </Button>
          <Button variant="contained" onClick={triggerLogout} sx={btnStyle}>
            Logout
          </Button>
        </>
      );
    }
    if (alertContext.type === "loginErr") {
      return (
        <Button variant="contained" onClick={handleClose} sx={btnStyle}>
          Retry
        </Button>
      );
    }
    if (alertContext.type === "deleteVideo") {
      return (
        <>
                  <Button variant="contained" onClick={handleClose} sx={btnStyle}>
            Cancel
          </Button>
        <Button variant="contained" onClick={handleDelete} sx={btnStyle}>
          Delete
        </Button>
        </>
      );
    }
    if (alertContext.type === "loginAlert") {
      return (
        <>
          <Button variant="contained" onClick={handleClose} sx={btnStyle}>
            Cancel
          </Button>
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={btnStyle}>
              Login
            </Button>
          </Link>
        </>
      );
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={alertContext.open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={alertContext.open}>
          <Box sx={style}>
            <Stack justifyContent="center" spacing={2}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {alertContext.title}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {alertContext.text}
              </Typography>
              <Box width="100%">{renderBtn()}</Box>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
