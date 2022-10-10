import { Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Loading from "../components/Loading";
import VideoCard from "../components/VideoCard/VideoCard";
import BlankPage from "../components/BlankPage"

export default function SearchVideo({ video, query, loading }) {
  return (
    <>
      {video.length === 0 ? (
        <BlankPage message={`No result for ${query}`} type="search" />
      ) : (
        <Container>
          {loading === true ? (
            <Loading />
          ) : (
            <Grid container spacing={2}>
              {video.map((video) => (
                <Grid item xl={2} lg={4} md={4} xs={12} sm={6}>
                  <VideoCard key={video._id} video={video} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      )}
    </>
  );
}
