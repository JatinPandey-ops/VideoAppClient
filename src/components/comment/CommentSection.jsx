import { Avatar, Box, Button, Container, IconButton, styled, Typography } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import SingleComment from "./SingleComment"
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Stack } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, commentsFetched, fetchComments } from '../../redux/commentSlice';
import { AddComment } from '@mui/icons-material';

const InputWrapper = styled("div")(({theme}) =>({
  display:"flex",
  gap:"10px",
  justifyContent:"space-between",
  alignItems:"center",
      width:"100%",

}));
const StyledInput = styled("input")(({theme}) =>({
  width:"100%",
  backgroundColor:"transparent",
  border:'none',
  outline:"none",
  color:theme.palette.text.primary
}));

export default function CommentSection() {
  const [commentDisplay,SetCommentDisplay] = useState("none")
  const {currentVideo} = useSelector((state) => state.video)
  const {currentUser} = useSelector((state) => state.user)
  const { comments,loading } = useSelector((state) => state.comment)
  const dispatch = useDispatch()
  const [input,setInput] = useState({userId:currentUser?._id,videoId:currentVideo?._id})
  const path = useLocation().pathname.split("/")[2];
  const  handleCommentDisplay = () => {
    commentDisplay === "none" ? SetCommentDisplay("Block") : SetCommentDisplay("none")
  }

  useEffect(() => {
    dispatch(fetchComments())
    const fetchComment = async () => {
      const res = await axios.get(`comment/${path}`)
      dispatch(commentsFetched(res.data))

    }
    fetchComment()
  },[path])
 
const postComment = async () => {
      await axios.post("comment/",input,{withCredentials:true})
      dispatch(addComment(input))
}

const handleChange = (e) => {
  setInput((prev) => {
    return { ...prev,[e.target.name]:e.target.value}
  });
}



  return (
    <Container>
        <InputWrapper>
        <Avatar src={currentUser?.img}/>
        <StyledInput placeholder='Write your comment...' name="comment" autoComplete="off" onChange={handleChange}/>
        <IconButton onClick={postComment}>
        <SendIcon/>
        </IconButton>
        </InputWrapper>
      <Stack direction="row" justifyContent="space-between" mt="20px">
        <Typography variant="h6" color="text.secondary">Comment Section</Typography> 
        <IconButton onClick={() => {handleCommentDisplay()}}><KeyboardArrowDownIcon/></IconButton>
        </Stack>
       <Box marginTop="20px" display={commentDisplay}>
        {comments?.map((comment) => ( <SingleComment comment={comment}/>))}

        </Box>
        
    </Container>
  )
}
