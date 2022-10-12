import { Box, Container, Grid } from "@mui/material";

import axios from "axios";
import VideoCard from "../components/VideoCard/VideoCard";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function Homepage({ type, tags, setTags }) {
  const [videos, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchVideos = async () => {
      const res = await axios.get(`video/${type}`, { withCredentials: true });
      setVideo(res.data);
      setLoading(false);
    };
    fetchVideos();
  }, [type]);

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <Box>
          <Grid container spacing={2}>
            {videos.map((video) => (
              <Grid item xl={2} lg={4} md={4} xs={12} sm={6}>
                <VideoCard key={video._id} video={video} type={type} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
