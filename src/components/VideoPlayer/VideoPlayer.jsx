import React, { useContext, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  styled,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import axios from "axios";
import { dislike, like } from "../../redux/videoSlice";
import { AlertContext } from "../../context/AlertContext";
import ShareModal from "../ShareModal";


const StyledVideo = styled("video")(({ theme }) => ({
  width: "100%",
}));
const iconStyle = {
  color:"red"
}
export default function VideoPlayer({ videoData }) {
  const theme = useTheme();
  const [open,setOpen] = useState(false)
  const url = window.location.href
  console.log(url)
  const alertContext = useContext(AlertContext)
  const dispatch = useDispatch();
  const { currentVideo } = useSelector((state) => state.video);
  const { currentUser } = useSelector((state) => state.user);

  const handleLike = async () => {
    dispatch(like(currentUser._id));
    await axios.put(
      `users/like/${currentVideo._id}`,
      undefined,
      { withCredentials: true }
    );
  };
  const handleDislike = async () => {
    dispatch(dislike(currentUser._id));
    await axios.put(
      `users/dislike/${currentVideo._id}`,
      undefined,
      { withCredentials: true }
    );
  };
  const handleShare = () => {
    setOpen(true)
  }
  console.log(open)
  const handleAlert = () => {
 alertContext.setText("Please Login to React to this Video");
 alertContext.setTitle("Login Required");
  alertContext.setOpen(true);
  alertContext.setType("loginAlert")

  };

  return (
    <Box>
      <Box>
        <StyledVideo
          autoplay
          preload="auto"
          controls
          poster={currentVideo?.imgUrl}
        >
          <source src={currentVideo?.videoUrl} />
        </StyledVideo>
      </Box>
      <Container>
        <Typography
          fontSize="large"
          variant="h6"
          component="div"
          color={theme.palette.text.primary}
        >
          {currentVideo?.title}
        </Typography>
        <Stack direction="column">
          <Typography
            fontSize="small"
            gutterBottom
            varaint="body2"
            color={theme.palette.text.secondary}
          >
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </Typography>
          <Stack direction="row" justifyContent="space-between" spacing={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton onClick={currentUser ? handleLike : handleAlert}>
                  {currentVideo?.likes?.includes(currentUser?._id) ? (
                    <FavoriteIcon sx={iconStyle} />
                  ) : (
                    <FavoriteBorderIcon sx={iconStyle} />
                  )}
                </IconButton>
                <Typography fontSize="medium">
                  {currentVideo?.likes?.length}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton onClick={currentUser ? handleDislike : handleAlert}>
                  {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                    <ThumbDownIcon sx={iconStyle} />
                  ) : (
                    <ThumbDownOffAltIcon sx={iconStyle} />
                  )}
                </IconButton>
                <Typography fontSize="medium">
                  {currentVideo?.dislikes?.length}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton onClick={handleShare} >
                  <ShareIcon sx={iconStyle} />
                </IconButton>
                <Typography fontSize="medium">Share</Typography>
              </Stack>
            </Stack>
        </Stack>
        <ShareModal open={open} setOpen={setOpen} url={url}/>
      </Container>
    </Box>
  );
}
