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
  deleteObject,
} from "firebase/storage";
import { app } from "../Firebase";
import { deleteComment } from "../redux/commentSlice";
import LoadingButton from '@mui/lab/LoadingButton';
import LogoutIcon from '@mui/icons-material/Login';
import { useState } from "react";

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


export default function AlertDialogBox() {
  const alertContext = useContext(AlertContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const deleteFile = (file, folder) => {
    const storage = getStorage(app);
    const storageref = ref(storage, folder + file);
    deleteObject(storageref)
      .then(() => {
        console.log("file deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const triggerLogout = async () => {
    setLoading(true)
    await axios.get("auth/logout", { withCredentials: true });
    dispatch(logout());
    setLoading(false)
    navigate("/");
    alertContext.setOpen(false);
    alertContext.setRes(false);
    alertContext.setTitle("")
    };

  const handleClose = () => {
    alertContext.setOpen(false);
  };
  const handleDelete = async () => {
    deleteFile(alertContext?.details?.videoName, "Videos/");
    await axios.delete(`video/${alertContext?.details?.path}`, {
      withCredentials: true,
    });
    navigate("/manage");
    alertContext.setTitle("")
    alertContext.setOpen(false)
  };
  const handleDeleteComment = async () => {
    await axios.delete(`comment/${alertContext?.details.comment._id}`, {
      withCredentials: true,
    });
    dispatch(deleteComment())
    alertContext.setTitle("")
    alertContext.setOpen(false)
  };

  const renderBtn = () => {
    if (alertContext.type === "logout") {
      return (
        <>
          <Button variant="contained" onClick={handleClose} >
            Cancel
          </Button>
          <LoadingButton
              loading={loading}
              loadingPosition="start"
              onClick={triggerLogout}
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
            >
              Logout
            </LoadingButton>
        </>
      );
    }
    if (alertContext.type === "loginErr") {
      return (
        <Button variant="contained" onClick={handleClose}>
          Retry
        </Button>
      );
    }
    if (alertContext.type === "deleteVideo") {
      return (
        <>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDelete} color="error">
            Delete
          </Button>
        </>
      );
    }
    if (alertContext.type === "loginAlert") {
      return (
        <>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button variant="contained" >
              Login
            </Button>
          </Link>
        </>
      );
    }
    if (alertContext.type === "delComment") {
      return (
      <>
        <Button variant="contained" onClick={handleClose} >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDeleteComment}>
          Delete
        </Button>
      </>
      )
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
            <Stack alignItems="center" spacing={2}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {alertContext?.title }
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {alertContext?.text} 
              </Typography>
              <Stack justifyContent="center" direction="row" spacing={2}>
                {renderBtn()}
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
