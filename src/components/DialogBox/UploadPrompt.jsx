import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, LinearProgress, Stack, styled, TextField } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect } from "react";
import { app } from "../../Firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default function UploadPrompt({ open, setClose }) {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPercentage, setImgPercentage] = useState(0);
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [tags, setTags] = useState([]);
  const [inputs, setInputs] = useState({});
  const btnDisable = imgPercentage && videoPercentage === 100 ? "disabled" : null
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };
  const uploadFile = (file, urlType,folder) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPercentage(Math.round(progress))
          : setVideoPercentage(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  const uploadVideo = (e) => {
    e.preventDefault()
    video && uploadFile(video, "videoUrl","Videos/");
  }
  const uploadImg = (e) => {
    e.preventDefault()
    img && uploadFile(img, "imgUrl","Thumbnails/");
  }

  
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "video",
        { ...inputs, tags },
        { withCredentials: true }
        );
        setImg(null)
        setVideo(null)
        setClose(false);
        res.status === 200 && navigate(`/video/${res.data._id}`);
      } catch (err) {
        console.log(err);
      }
    };
    const videoProgressBar = () => {
      if(videoPercentage > 0){
        return(
        <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" color="warning" value={videoPercentage} />
        </Box>
        )
      }if(videoPercentage === 100){
        return (
        <Typography color="success">Uploaded Successfully</Typography>
        )
      }else{
        return(
        <Stack direction="row" spacing={2}>
        <TextField
          type="file"
          accept="video/*"
          onChange={(e) => {
            setVideo(e.target.files[0]);
          }}
        />
        <IconButton onClick={uploadVideo}>
          <UploadIcon/>
        </IconButton>
        </Stack>
        )
      }
    }
    const imgProgressBar = () => {
      if(imgPercentage > 0){
        return(
        <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" color="warning" value={imgPercentage} />
        </Box>
        )
      }if(imgPercentage < 100){
        return (
          <Stack direction="row" spacing={2}>
          <TextField
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
        <IconButton onClick={uploadImg}>
          <UploadIcon/>
        </IconButton>
  
        </Stack>
          )
        }if(imgPercentage === 100){
          return(
          <Typography color="success">Uploaded Successfully</Typography>
        )
      }
    }
    
    return (
      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={setClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="div"
            >
              Upload a new video
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Choose your video file
            </Typography>
            {videoProgressBar()}
            <TextField
              type="text"
              fullWidth
              label="Title"
              margin="dense"
              variant="outlined"
              placeholder="Write a catchy title for your video"
              name="title"
              onChange={handleChange}
              color="secondary"
            />

            <TextField
              type="text"
              fullWidth
              multiline
              rows={4}
              label="Description"
              margin="dense"
              variant="outlined"
              placeholder="Describe your video"
              name="desc"
              onChange={handleChange}
              color="secondary"
            />

            <TextField
              type="text"
              fullWidth
              label="Tags"
              variant="outlined"
              margin="dense"
              placeholder="Separate tags by comma"
              name="tags"
              onChange={handleTags}
              color="secondary"
            />
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Upload Thumbnail
            </Typography>
            {imgProgressBar()}

            <Button
              disableBtn
              variant="contained"
              size="medium"
              endIcon={<UploadIcon />}
              sx={{ width: "100%", marginTop: "10px" }}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
