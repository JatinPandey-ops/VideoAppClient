import SearchOutlined from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import UploadPrompt from "../DialogBox/UploadPrompt"
import { Link } from "react-router-dom";
import { DisplayContext } from "../../context/DisplayContext";
import { useSelector } from "react-redux";
import { useState } from "react";

const SearchWrapper = styled("div")(({ theme }) => ({
  alignItems: "center",
  cursor: "pointer",
  width: "50%",
  padding: "0px 8px",
  borderRadius: theme.shape.borderRadius,
}));

const StyledInput = styled("input")(({ theme }) => ({
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
  width: "90%",
  padding: "10px 20px",
  color: theme.palette.text.primary,
}));

export default function Appbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false)
  console.log(open)
  const [searchBarDisplay, setSearchBarDisplay] = useState("none");
  const [searchIconDisplay, setSearchIconDisplay] = useState("block");
  const { currentUser } = useSelector((state) => state.user);
  const theme = useTheme();
  const displayContext = useContext(DisplayContext);
  const handleDisplay = () => {
    searchIconDisplay === "block"
      ? setSearchIconDisplay("none")
      : setSearchIconDisplay("block");
    searchBarDisplay === "flex"
      ? setSearchBarDisplay("none")
      : setSearchBarDisplay("flex");
  };
  console.log(searchIconDisplay);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton
              sx={{ display: { xs: "block", md: "none", lg: "none" } }}
              onClick={displayContext.toggleHandleDisplay}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "block", md: "none", lg: "none" } }}>
              Logo
            </Box>
            <Typography
              sx={{ display: { xs: "none", md: "block", lg: "BLock" } }}
              variant="h6"
              component="body2"
            >
              VideoApp
            </Typography>
          </Stack>
          <SearchWrapper
            sx={{
              display: {
                xs: searchBarDisplay,
                sm: searchBarDisplay,
                lg: "flex",
              },
            }}
          >
            <StyledInput placeholder="Search...." />
          </SearchWrapper>

          <Box>
            <Stack direction="row" alignitem="center" spacing={1}>
              <IconButton
                onClick={handleDisplay}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <SearchOutlined />
              </IconButton>
              <Box display={searchIconDisplay}>
                {currentUser ? (
                  <Stack direction="row" alignItems="center" spacin={3}>
                    <IconButton onClick={() => {setOpen(true)}}>
                      <VideoCallIcon/>
                    </IconButton>
                    <Link to={`/channel/${currentUser._id}`}>
                      <Avatar src={currentUser.img} />
                    </Link>
                  </Stack>
                ) : (
                  <Link to="signin" style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ color: theme.palette.secondary }}
                    >
                      Signin
                    </Button>
                  </Link>
                )}
              </Box>
            </Stack>
          </Box>
        </Stack>

      </Toolbar>
      <UploadPrompt open={open} setClose={close}/>
    </AppBar>
  );
}
