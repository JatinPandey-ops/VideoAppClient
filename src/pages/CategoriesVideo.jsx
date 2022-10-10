import { Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import VideoCard from "../components/VideoCard/VideoCard";
import BlankPage from "../components/BlankPage"

export default function CategoriesVideo({ tags }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchVideos = async () => {
      const res = await axios.get(`video/tags?tags=${tags}`);
      setLoading(false);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);
  return (
    <>
    {videos.length === 0 ? (<BlankPage message={`No video found in category ${tags[0]}`}/>) : (    <Container>
      {loading === true ? (
        <Loading />
      ) : (
        <Grid container spacing={2}>
          {videos.map((video) => (
            <Grid item xl={2} lg={4} md={4} xs={12} sm={6}>
              <VideoCard key={video._id} video={video} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>)}
    </>
  );
}
