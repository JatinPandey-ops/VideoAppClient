import { Typography, styled, Stack, Box, useTheme, Button } from "@mui/material";
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
import LoginIcon from '@mui/icons-material/Login';
import { useContext } from "react";
import { ModeContext } from "../../context/ThemeContext";
import { DisplayContext } from "../../context/DisplayContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import axios from "axios";
import { AlertContext } from "../../context/AlertContext";

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
  display:{md:"none",xs:"block"}
}));

export default function Sidebar() {
  const toggleColorMode = useContext(ModeContext);
  const displayContext = useContext(DisplayContext);
  const display = displayContext.display;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {currentUser} = useSelector((state) => state.user);
  const theme = useTheme();
  const alertContext = useContext(AlertContext)
  
  const handleLogout = () => {
    alertContext.setOpen(true)
    alertContext.setTitle("Are you sure?")
    alertContext.setText("You will be logged out")
    alertContext.setType("logout")
  };
  return (
    <Box
      sx={{
        display: { xs: display, sm: display, md: "flex", lg: "flex" },
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        position: "sticky",
        top: "0px",
        padding: "10px",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Stack spacing={2}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItem>
            <HomeIcon />
            <StyledTypography>Home</StyledTypography>
          </MenuItem>
        </Link>

        <Link
          to="trending"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem>
            <ExploreIcon />
            <StyledTypography>Explore</StyledTypography>
          </MenuItem>
        </Link>

        <Link to="sub" style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItem>
            <SubscriptionsIcon />
            <StyledTypography>Subscriptions</StyledTypography>
          </MenuItem>
        </Link>
      </Stack>
      <Hr /> <StyledTypography variant="h6">Categories</StyledTypography>
      <Stack spacing={2} sx={{ marginTop: "20px" }}>
        <MenuItem>
          <MusicNoteIcon />
          <StyledTypography>Music</StyledTypography>
        </MenuItem>
        <MenuItem>
          <VideogameAssetIcon />
          <StyledTypography>Gaming</StyledTypography>
        </MenuItem>
        <MenuItem>
          <SchoolIcon />
          <StyledTypography>Learning</StyledTypography>
        </MenuItem>
        <MenuItem>
          <MovieCreationIcon />
          <StyledTypography>Movies</StyledTypography>
        </MenuItem>
        <MenuItem>
          <CheckroomIcon />
          <StyledTypography>Fashion</StyledTypography>
        </MenuItem>
        <MenuItem onClick={toggleColorMode.colorMode.toggleColorMode}>
          {theme.palette.mode === "light" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
          <StyledTypography>{theme.palette.mode} Mode</StyledTypography>
        </MenuItem>
        {currentUser ? (
          <MenuItem onClick={handleLogout}>
            <LogoutIcon />
            <StyledTypography>Logout</StyledTypography>
          </MenuItem>

        ) : (
          <Link to="signin" style={{ textDecoration: "none", color: "inherit" }} >

          <MenuItem>
          <LoginIcon />
          <StyledTypography>Login</StyledTypography>
        </MenuItem>
          </Link>
        )}
      </Stack>
    </Box>
  );
}
