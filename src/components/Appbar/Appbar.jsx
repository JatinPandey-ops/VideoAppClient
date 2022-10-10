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
import UploadPrompt from "../DialogBox/UploadPrompt";
import { Link } from "react-router-dom";
import { DisplayContext } from "../../context/DisplayContext";
import { useSelector } from "react-redux";
import { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from "axios";

const SearchWrapper = styled("div")(({ theme }) => ({
  alignItems: "center",
  cursor: "pointer",
  width: "100%",
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

export default function Appbar({ setQuery, setVideo, query, setLoading }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
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
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`video/search?q=${query}`);
      setVideo(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton
              sx={{ display: { xs:searchIconDisplay, md: "none", lg: "none" } }}
              onClick={displayContext.toggleHandleDisplay}
            >
              <MenuIcon />
            </IconButton>
            <Stack direction="row" justifyContent="center" spacing={1}>

            <Box>
              <img
                style={{ width: "35px", height: "35px", objectFit: "cover" }}
                src="https://img.icons8.com/external-prettycons-flat-prettycons/47/000000/external-electrons-technology-prettycons-flat-prettycons.png"
                alt="loading.."
              />
            </Box>
            <Typography
              sx={{
                display : searchIconDisplay,
                fontFamily: "Silkscreen, cursive",
              }}
              variant="h6"
              component="body2"
            >
              <span style={{ color: "red", fontSize: "inherit" }}>E</span>
              lectron
            </Typography>
            </Stack>
          </Stack>
          <SearchWrapper
            sx={{
              display: searchBarDisplay,
            }}
          >
            <StyledInput placeholder="Search....." onChange={handleChange} />
            <IconButton onClick={handleSearch}>
              <SearchOutlined />
            </IconButton>
          </SearchWrapper>

          <Box>
            <Stack direction="row" justifyContent="center" spacing={0.5}>
              {searchBarDisplay === "none" ? (
                <Link to="search">
                  <IconButton onClick={handleDisplay}>
                    <SearchOutlined />
                  </IconButton>
                </Link>
              ) : (
                <Link to="/">
                  <IconButton onClick={handleDisplay}>
                    <CancelOutlinedIcon />
                  </IconButton>
                </Link>
              )}
              <Box display={searchIconDisplay}>
                {currentUser ? (
                  <Stack direction="row" justifyContent="center" spacin={2}>
                    <Box>
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <VideoCallIcon />
                      </IconButton>
                    </Box>
                    <Box>
                      <Link to={`/channel/${currentUser._id}`}>
                        <Avatar src={currentUser.img} />
                      </Link>
                    </Box>
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
      <UploadPrompt open={open} setClose={close} />
    </AppBar>
  );
}
