import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { subscription } from "../../redux/userSlice";
import { AlertContext } from "../../context/AlertContext";

export default function Description({ channel }) {
  const [descriptionDisplay, setDescriptionDisplay] = useState("none");

  const { currentVideo } = useSelector((state) => state.video);
  const { currentUser } = useSelector((state) => state.user);

  const theme = useTheme();
  const alertContext = useContext(AlertContext);
  const dispatch = useDispatch();

  const handleSubscribe = async () => {
    if (currentUser.subscribedUsers?.includes(channel._id)) {
      dispatch(subscription(channel._id));
      await axios.put(
        `users/unsub/${channel._id}`,
        undefined,
        { withCredentials: true }
      );
    } else {
      dispatch(subscription(channel._id));
      await axios.put(
        `users/sub/${channel._id}`,
        undefined,
        { withCredentials: true }
      );
    }
  };

  const handleAlert = async () => {
    alertContext.setOpen(true)
    alertContext.setTitle("Login Required");
   alertContext.setText("Please Login to subscribe to this channel");
   alertContext.setType("loginAlert")
  };

  const handleDescription = () => {
    descriptionDisplay === "none"
      ? setDescriptionDisplay("block")
      : setDescriptionDisplay("none");
  };

  return (
    <Container>
      <Box>
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <Link to={`/channel/${channel._id}`}>
                <Avatar src={channel.img} />
              </Link>
              <Stack justifyContent="center">
                <Typography color={theme.palette.text.primary}>
                  {channel.name}{" "}
                </Typography>
                <Typography
                  fontSize="small"
                  color={theme.palette.text.secondary}
                >
                  {channel.subscribers} subscribers
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Button
            variant="contained"
            onClick={currentUser === null ? handleAlert : handleSubscribe}
            color={currentUser?.subscribedUsers?.includes(channel._id) ? "primary" : "error"}
          >
            {currentUser === null
              ? "Subscribe"
              : currentUser.subscribedUsers?.includes(channel._id)
              ? "Subscribed"
              : "Subscribe"}
          </Button>
        </Stack>
      </Box>
      <Box marginTop="20px">
        <Stack direction="row" justifyContent="space-between">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color={theme.palette.text.secondary}
          >
            Description
          </Typography>
          <IconButton
            onClick={() => {
              handleDescription();
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Stack>
        <Box display={descriptionDisplay}>{currentVideo.desc} </Box>
      </Box>
    </Container>
  );
}
