import React, { useState } from "react";
import {
  Box,
  useTheme,
  Avatar,
  styled,
  Stack,
  Typography,
  Button,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import Loading from "../components/Loading"
import EditIcon from '@mui/icons-material/Edit';
import { Link, useLocation } from "react-router-dom";
import VideoCard from "../components/VideoCard/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import UpdateModal from "../components/UpdateModal";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { subscription } from "../redux/userSlice";
import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "7rem",
  height: "7rem",
}));

function ChannelPage() {
  const [videos, setVideos] = useState([]);
  const [open, setOpen ] = useState(false);
  const [type, setType ] = useState("");
  const [owner, setOwner ] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const path = useLocation().pathname.split("/")[2];
  const theme = useTheme();
  const alertContext = useContext(AlertContext)
  const dispatch = useDispatch();
  const { currentChannel,loading } = useSelector((state) => state.channel);
  const { currentUser } = useSelector((state) => state.user);
  const data = path === currentUser?._id ? currentUser : currentChannel
  useEffect(() => {
    currentUser?._id === path ? setOwner(true) : setOwner(false)

  },[path])


  useEffect(() => {
    const fetchUserVideos = async () => {
      setLoadingVideo(true)
      const res = await axios.get(
        `video/uservideo/${path}`
      );
      setVideos(res.data);
      setLoadingVideo(false)
    };
    fetchUserVideos();
  }, [path]);

  const handleUpdatePfp = () => {
    setOpen(true)
    setType("profile")
  }
  const handleUpdatebg = () => {
    setOpen(true)
    setType("cover")
  }
  const handleUpdateName = () => {
    setOpen(true)
    setType("name")
  }
  const handleSubscribe = async () => {
    if (currentUser.subscribedUsers?.includes(data._id)) {
      await axios.put(`users/unsub/${currentChannel._id}`,undefined,{withCredentials:true})
      dispatch(subscription(currentChannel._id))
    }else{
      await axios.put(`users/sub/${currentChannel._id}`,undefined,{withCredentials:true})
      dispatch(subscription(currentChannel._id))
      
    }
  };
 
  const handleAlert = async () => {
    alertContext.setOpen(true)
   alertContext.setText("Please Login to subscribe to this channel");
   alertContext.setType("loginAlert")
  };
  return (
  <>
{loading === true ? (<Loading type="component"/>) : (<Box>
          <Box sx={{position:"relative",width:"100%"}}>
            <img style={{width:"100%",height:"150px",objectFit:"cover"}}
              src={data.backgroundImg}
              alt="loading..."
            />
            <IconButton sx={{display:owner === true ? "block" : "none",position:"absolute", right: "0px",bottom: "0px"}} onClick={handleUpdatebg}><AddAPhotoIcon/></IconButton>
          </Box>
          <Container>
            <UpdateModal open={open} type={type} setOpen={setOpen} />

            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Stack>
                  <Box sx={{position:"relative"}}>
                  <StyledAvatar src={data.img} />
                  <IconButton sx={{display:owner === true ? "block" : "none",position:"absolute",bottom:"-10px",right:"0px"}} onClick={handleUpdatePfp}><AddAPhotoIcon/></IconButton>

                  </Box>
                  <Stack marginTop="5px" justifyContent="center">
                      <Container sx={{position:"relative"}}>
                      <Typography variant="h5">{data.name.trim()}</Typography>
                      <IconButton sx={{display:owner === true ? "block" : "none",position:"absolute",bottom:"-4px",right:"-2px"}} onClick={handleUpdateName}><EditIcon fontSize="small"/></IconButton>

                      </Container>
                      <Typography
                        variant="body2"
                        color={theme.palette.text.secondary}
                      >
                        {data.subscribers} Subscribers
                      </Typography>
                    </Stack>
                </Stack>
              </Box>
              <Button variant="contained" onClick={currentUser === null ? handleAlert : handleSubscribe} sx={{display:owner === true ? "none" : "block",width: "150px", height: "45px",mt:"20px"}}>
              {currentUser === null
              ? "Subscribe"
              : currentUser.subscribedUsers?.includes(currentChannel._id)
              ? "Subscribed"
              : "Subscribe"}
              </Button>
            </Stack>
          </Container>
          <Box padding="20px 5px" sx={{display:owner === true ? "block" : "none"}}>
          <Link to="/manage" style={{textDecoration:"none"}}>
          <Button variant="outlined" color="secondary" fullWidth>Manage Videos</Button>

          </Link>
          </Box>
          <hr sx={{ padding: "4px" }} />
          <Box>
            <Container
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                component="div"
                color="text.secondary"
                mt="5px"
              >
                Uploads
              </Typography>
            </Container>
            <Container>
              {loadingVideo === true ? (<Loading/>) : (<Grid container>
                {videos.map((video) => (
                  <Grid xl={2} lg={4} md={4} xs={12} sm={6}>
                    <VideoCard key={video._id} video={video} />
                  </Grid>
                ))}
              </Grid>)}

            </Container>
          </Box>
        </Box>)}

</>

    
  );
}

export default ChannelPage;
