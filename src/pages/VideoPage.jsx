import { Box, Container, Grid, Stack, styled } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import CommentSection from '../components/comment/CommentSection'
import Description from '../components/Description/Description'
import Loading from '../components/Loading'
import Recommendation from "../components/RecommendationSectin/Recommendation"
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'
import { fetchVideo, fetchSuccess} from '../redux/videoSlice';
import {channelfetched,fetchChannel } from '../redux/channelSlice';

const Hr = styled('hr')(({theme})=>({
  margin:"1rem 0rem"
}));


export default function VideoPage() {
  const [channel,setChannel] = useState({});
  const [loading,setLoading] = useState(false);
  const {currentVideo} = useSelector((state) => state.video);
  const {currentChannel} = useSelector((state) => state.channel);
  const dispatch =  useDispatch();
  const path = useLocation().pathname.split("/")[2];


  useEffect(() => {
    dispatch(fetchVideo())
    const fetchData =  async () => {
      try{
        const videoRes = await axios.get(`video/find/${path}`)
        dispatch(fetchSuccess(videoRes.data));
        
      }catch(error){
        console.log(error)
      }
      
    }
    fetchData(); 
  },[path])
  

  useEffect(() => {
    const increaseView = async () => {
      await axios.put(`video/view/${path}`)

    }
    increaseView();
  },[path])

  useEffect(() => {
    dispatch(fetchChannel())
    setLoading(true)
    const fetchChannelDetails = async () => {
      const res = await axios.get(`users/find/${currentVideo?.userid}`)
      setLoading(false)
      setChannel(res.data)
      dispatch(channelfetched(res.data))

    }
    fetchChannelDetails();
  },[currentVideo])

  
  return (
  <Box>
  { loading === true ? (<Loading/>) : (
    <Box>
    <Grid container>
    <Grid item lg={8} md={8} width="100%">
    <Stack>
    <VideoPlayer/>
    <Hr/>
   <Description channel={channel}/>
    <Hr/>
    <CommentSection/>
    </Stack>
    </Grid>
    <Grid item lg={4} md={4}>
      <Recommendation tags={currentVideo?.tags}/>
    </Grid>
    </Grid>


  </Box> 
  )}
  </Box>
  )
}
