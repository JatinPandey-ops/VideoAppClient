import { CircularProgress, Container } from '@mui/material'
import React from 'react'

export default function Loading() {
  return (
    <Container sx={{width:"100%", height:"80vh",display:"flex", alignItems:"center", justifyContent:"center"}}>
    <CircularProgress color="secondary"/>

    </Container>
  )
}
