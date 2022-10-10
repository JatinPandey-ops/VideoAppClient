import Appbar from "./components/Appbar/Appbar";
import Homepage from "./pages/Homepage";
import Videopage from "./pages/VideoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar/Sidebar";
import ManagePage from "./pages/ManagePage"
import { CssBaseline, Grid, ThemeProvider, useTheme } from "@mui/material";
import Channelpage from "./pages/ChannelPage";
import { ModeContext } from "./context/ThemeContext";
import { useContext, useState } from "react";
import AlertDialogBox from "./components/AlertDialogBox";
import VideoEditPage from "./pages/VideoEditPage";
import CategoriesVideo from "./pages/CategoriesVideo";
import SearchVideo from "./pages/SearchVideo";
import { DisplayContext } from "./context/DisplayContext";

function App() {
  //SEarch by tags
  const [tags,setTags] = useState([])
  const [query,setQuery] = useState("")
  //Search by query
  const [video,setVideo] = useState([])
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const themeContext = useContext(ModeContext);
  const displayContext = useContext(DisplayContext);
  const display = displayContext.display
 
  return (
    <ThemeProvider theme={themeContext.theme}>
      <CssBaseline />
      <BrowserRouter>
        <Appbar setQuery={setQuery} setVideo={setVideo} query={query} setLoading={setLoading}/>
        <AlertDialogBox/>
        <Grid container position="relative">
          <Grid
            lg={2}
            md={1}
            sx={{
              [theme.breakpoints.down("md")]: {
                position: "fixed",
                height: "100vh",
                left: display === false ? "-200px" : "0px",
                transition:"0.5s",
                zIndex: "999",
              },
            }}
          >
            <Sidebar  tags={tags} setTags={setTags} />
          </Grid>
          <Grid lg={10} md={11} xs={12}>
            <Routes>
              <Route path="/">
                <Route index element={<Homepage type="random"/>} />
                <Route path="trending" element={<Homepage type="trending" />} />
                <Route path="sub" element={<Homepage type="sub"/>} />
                <Route path="categories" element={<CategoriesVideo tags={tags}/>} />
                <Route path="search" element={<SearchVideo query={query} video={video} loading={loading}/>} />
                <Route path="signin" element={<Login />} />
                <Route path="signup" element={<Register />} />
                <Route path="manage" element={<ManagePage />} />
                <Route path="/edit">
                  <Route path=":id" element={<VideoEditPage/>}/>
                </Route>
                <Route path="/channel">
                  <Route path=":id" element={<Channelpage />} />
                </Route>
                <Route path="/video">
                  <Route path=":id" element={<Videopage />} />
                </Route>
              </Route>
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
