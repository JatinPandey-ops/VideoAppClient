
import { Avatar, Box, Container, Stack, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {format} from "timeago.js"
import axios from "axios"
import { Link } from 'react-router-dom'


export default function VideoCard({video,type}) {
  const theme = useTheme()

  const [channelDetail , setChannelDetail] = useState({});

  useEffect (() => {
    const fetchChannelDetail = async () =>{
      const res = await axios.get(`users/find/${video.userid}`);
      setChannelDetail(res.data)
    };
    fetchChannelDetail();
  }, [type])
  
  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none" , color:"inherit"}}>
    <Box sx={{aspectRatio:"16/9",borderRadius:"5px",width:"100%",backgroundColor:theme.palette.primary.main}}>
      <Stack>
      <img
      style={{width:"100%",height:"200px",objectFit:"cover"}}
      src={video.imgUrl}
      alt='loading....'
      />
      <Container>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar src={channelDetail.img}/>

      <Box marginTop="10px" padding="7px">
        <Typography variant="body2" component="div" fontWeight="600" color={theme.palette.text.primary}>{video.title}</Typography>
        <Typography variant="Body2" component="div" fontWeight="500" fontSize="small" color={theme.palette.text.secondary}>{channelDetail.name}</Typography>
        <Typography variant="Body2" component="div" fontSize="small" color={theme.palette.text.secondary}>{video.views} views • {format(video.createdAt)} </Typography>
      </Box>
      </Stack>

      </Container>

      </Stack>
    </Box>
    </Link>
  )
}
