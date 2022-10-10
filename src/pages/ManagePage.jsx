import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BlankPage from "../components/BlankPage";
import Loading from "../components/Loading";
import SmallCard from "../components/VideoCard/SmallCard";

const ManagePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const res = await axios.get(`video/uservideo/${currentUser._id}`);
      setVideos(res.data);
      setLoading(false);
    };
    fetch();
  }, [currentUser]);

  return (
    <>
    {videos.length === 0 ? (<BlankPage message="No Uploads Found"/>) : (    <Container>
    
    {currentUser === null || loading === true ? (
      <Loading />
    ) : (
      videos.map((video) => (
        <SmallCard key={video._id} video={video} type="edit" />
      ))
    )
  }
    </Container>)}
    </>
  );
};

export default ManagePage;
