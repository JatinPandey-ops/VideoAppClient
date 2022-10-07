import { Stack } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSuccess, fetchVideo } from '../../redux/videoSlice'
import SmallCard from "../VideoCard/SmallCard"

function Recommendation({tags}) {
  const [videos , setVideos] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`video/tags?tags=${tags}`);
      setVideos(res.data)

    }
    fetchVideos();
  },[tags])
  return (
    <Stack>
      {videos.map((video) => (
        
        <SmallCard key={video._id} video={video}/>
      ))}

    </Stack>
  )
}

export default Recommendation