import { Box, Container, IconButton, Menu, MenuItem, Stack, styled, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {format} from 'timeago.js'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const menuStyle= {

}



export default function SmallCard({video , type}) {

  const [channel,setChannel] = useState({})
  const url = type === "edit" ? `/edit/${video._id}` : `/video/${video._id}`

  const theme = useTheme()
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchUser = async () => {
      const res = await axios.get(`users/find/${video.userid}`)
      setChannel(res.data)
    }
    fetchUser()
  }, [video])

  return (
      <Link to={url} style={{textDecoration: "none"}}>
    <Container sx={{marginTop:"20px",width:"100%"}}>

      <Stack direction="row" spacing={2} alignItems="flex-Start">
      <img
      style={{height:"94px",width:"165px",objectFit:"cover"}}
      src={video.imgUrl}/>
      <Box width="inherit">
      <Typography  fontWeight="600" fontSize="small"color={theme.palette.text.primary}>{video.title}</Typography>
      <Typography  fontSize="small" color={theme.palette.text.secondary}>{channel.name}</Typography>
      <Typography fontSize="small" color={theme.palette.text.secondary}>{video.views} views • {format(video.createdAt)}</Typography>

      </Box>
      </Stack>
    </Container>
      </Link>

  )
}
