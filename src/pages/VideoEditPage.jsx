import {
  Box,
  Button,
  Container,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { app } from "../Firebase";
import { useSelector } from "react-redux";
import { AlertContext } from "../context/AlertContext";

const Styledimg = styled("img")((theme) => ({
  aspectRatio: "16/9",
  width: "100%",
}));

export default function VideoEditPage() {
  const [video, setVideo] = useState({});
  const [error, setError] = useState(false);
  const [img, setImg] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const alertContext = useContext(AlertContext)
  const path = useLocation().pathname.split("/")[2];
  const videoName = video.videoUrl?.split("%")[1].split("?")[0].slice(2)
  const navigate = useNavigate();
  useEffect(() => {
    alertContext.setDetails({path,videoName})
  },[path,videoName])

  const uploadFile = (file, urlType, folder) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(Math.round(progress));
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

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const res = await axios.get(
        `video/find/${path}`
      );
      setVideo(res.data);
      setLoading(false);
    };
    fetch();
  }, [path]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl", "Thumbnails/");
  }, [img]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleTags = (e) => {
    setTags(e.target.value.split(","));
    setInputs((prev) => {
      return { ...prev, tags: tags };
    });
  };
  const handleDelete = async () => {
    alertContext.setOpen(true)
    alertContext.setTitle("Are you sure?")
    alertContext.setText("Do you really want to delete this video?This cannot be undone")
    alertContext.setType("deleteVideo")

  };
  const handleUpdate = async () => {
    inputs === {}
      ? setError(true)
      : await axios.put(`video/${path}`, inputs, {
          withCredentials: true,
        });
        console.log("uPloaded")
    navigate(`/video/${video._id}`);
  };
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <Container>
          <Stack spacing={3}>
            <Box>
              <Styledimg src={video.imgUrl} alt="loading..." />
            </Box>
            {percentage > 0 ? (
              `Uploading ${percentage}%`
            ) : (
              <>
              <Typography variant="h5" fontSize="medium">New Thumbnail</Typography>
              <TextField
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                }}
              />

              </>
            )}

            <TextField
              type="text"
              fullWidth
              label="Title"
              margin="dense"
              variant="outlined"
              defaultValue={video.title}
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
              defaultValue={video.desc}
              name="desc"
              onChange={handleChange}
              color="secondary"
            />
            <TextField
              type="text"
              fullWidth
              label="Tags"
              margin="dense"
              variant="outlined"
              defaultValue={video.tags}
              name="tags"
              onChange={handleTags}
              color="secondary"
            />
          </Stack>
          <Box sx={{ marginTop: "20px" }}>
            <Stack direction="row" spacing={2} justifyContent="space-evenly">
              <Button variant="filled" color="danger" onClick={handleDelete}>
                Delete
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleUpdate}
              >
                Update Video
              </Button>
            </Stack>
          </Box>
        </Container>
      )}
    </>
  );
}
