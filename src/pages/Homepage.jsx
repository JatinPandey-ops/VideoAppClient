import { Box, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import axios from "axios"
import VideoCard from "../components/VideoCard/VideoCard"
import { useEffect, useState } from "react";

export default function Homepage({type}) {
  const [videos , setVideo] = useState([]);

  useEffect (() => {
    const fetchVideos = async () =>{
      const res = await axios.get(`video/${type}`);
      setVideo(res.data)
    };
    fetchVideos();
  }, [type])
  return (
      <Container>
          <Grid container spacing={2}>
            {videos.map((video) =>(
            <Grid item xl={2} lg={4} md={4} xs={12} sm={6}>

                <VideoCard key={video._id} video={video} type={type}/>
            </Grid>
            ))}
         </Grid>
      </Container>
  );
}
