import {
  Typography,
  styled,
  Stack,
  Box,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import SchoolIcon from "@mui/icons-material/School";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import  CustomScroll  from "react-custom-scroll"
import { useContext } from "react";
import { ModeContext } from "../../context/ThemeContext";
import { DisplayContext } from "../../context/DisplayContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../../context/AlertContext";

const waterMark = {
  fontSize:"10px"
}
const social = {
  fontSize:"14px"
}
const iconStyle = {
  color:"red"
}

const MenuItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyItems: "center",
  gap: "20px",
  cursor: "pointer",
  fontWeight: "500",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  padding: theme.spacing(1),
}));

const Hr = styled("hr")(({ theme }) => ({
  margin: theme.spacing(3, 0),
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
  display: { md: "none", xs: "block" },
}));

export default function Sidebar({ setTags }) {
  const toggleColorMode = useContext(ModeContext);
  const { currentUser } = useSelector((state) => state.user);
  const theme = useTheme();
  const alertContext = useContext(AlertContext);

  const handleLogout = () => {
    alertContext.setOpen(true);
    alertContext.setTitle("Are you sure?");
    alertContext.setText("You will be logged out");
    alertContext.setType("logout");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height:"100vh",
        width: "100%",
        position: "sticky",
        top: "0px",
        padding: "10px",
        overflowY:"auto",
        backgroundColor: theme.palette.primary.main,
      }}
    >

      <Box>

      <Stack spacing={2}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItem>
            <HomeIcon sx={iconStyle}/>
            <StyledTypography>Home</StyledTypography>
          </MenuItem>
        </Link>

        <Link
          to="trending"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem>
            <ExploreIcon sx={iconStyle} />
            <StyledTypography>Explore</StyledTypography>
          </MenuItem>
        </Link>

        <Link to="sub" style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItem sx={{ display: currentUser ? "flex" : "none" }}>
            <SubscriptionsIcon sx={iconStyle}/>
            <StyledTypography>Subscriptions</StyledTypography>
          </MenuItem>
        </Link>
      </Stack>
      <Hr /> <StyledTypography variant="h6">Categories</StyledTypography>
      <Stack spacing={2} sx={{ marginTop: "20px" }}>
        <Link
          to="categories"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem
            onClick={() => {
              setTags(["music", "song", "singer"]);
            }}
          >
            <MusicNoteIcon sx={iconStyle}/>
            <StyledTypography>Music</StyledTypography>
          </MenuItem>
        </Link>
        <Link
          to="categories"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem
            onClick={() => {
              setTags(["gaming", "game", "videogame"]);
            }}
          >
            <VideogameAssetIcon sx={iconStyle}/>
            <StyledTypography>Gaming</StyledTypography>
          </MenuItem>
        </Link>
        <Link
          to="categories"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem
            onClick={() => {
              setTags(["study", "learn", "education"]);
            }}
          >
            <SchoolIcon sx={iconStyle} />
            <StyledTypography>Learning</StyledTypography>
          </MenuItem>
        </Link>
        <Link
          to="categories"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem
            onClick={() => {
              setTags(["movies", "picture", "film"]);
            }}
          >
            <MovieCreationIcon sx={iconStyle} />
            <StyledTypography>Movies</StyledTypography>
          </MenuItem>
        </Link>
        <Link
          to="categories"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem
            onClick={() => {
              setTags(["fashion", "lifestyle", "trend"]);
            }}
          >
            <CheckroomIcon sx={iconStyle}/>
            <StyledTypography>Fashion</StyledTypography>
          </MenuItem>
        </Link>
        <MenuItem onClick={toggleColorMode.colorMode.toggleColorMode}>
          {theme.palette.mode === "light" ? (
            <Brightness7Icon sx={iconStyle} />
          ) : (
            <Brightness4Icon sx={iconStyle} />
          )}
          <StyledTypography>{theme.palette.mode} Mode</StyledTypography>
        </MenuItem>
        {currentUser ? (
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={iconStyle} />
            <StyledTypography>Logout</StyledTypography>
          </MenuItem>
        ) : (
          <Link
            to="signin"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <LoginIcon sx={iconStyle} />
              <StyledTypography>Login</StyledTypography>
            </MenuItem>
          </Link>
        )}
      </Stack>
      <Hr/>
      </Box>
      <Box sx={{fontSize:"5px",}}>
        <Stack alignItems="center">

        <Typography sx={waterMark} >Design and developed by :</Typography>
        <Typography sx={waterMark} >Jatin Pandey</Typography>
        <Box>
    
        <IconButton onClick={() => (window.location = "https://github.com/JatinPandey-ops")} ><GitHubIcon sx={social}/></IconButton>

        <IconButton onClick={()=> (window.location = 'https://twitter.com/ghoul_7788')}><TwitterIcon sx={social}/></IconButton>
 

        </Box>
        <Typography  color="text.secondary" sx={waterMark} >v 1.0.0</Typography>
        </Stack>

      </Box>
    </Box>

  );
}
