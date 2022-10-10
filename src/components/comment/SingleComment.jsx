import { Avatar, Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { format } from "timeago.js";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import {AlertContext} from "../../context/AlertContext"

export default function SingleComment({ comment }) {
  const [user, setUser] = useState({});
  const { currentUser} = useSelector((state) => state.user)
  const { currentVideo} = useSelector((state) => state.video)
  const alertContext = useContext(AlertContext)
  const theme = useTheme();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`users/find/${comment.userId}`);
      setUser(res.data);
    };
    fetch();
  }, [comment]);

  const handleDelete = () => {
    alertContext.setOpen(true)
    alertContext.setTitle("Are you sure?")
    alertContext.setText("This step cannot be undone")
    alertContext.setType("delComment")
    alertContext.setDetails({comment})
  }
  return (
    <Box
      sx={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "2%",
        backgroundColor: theme.palette.primary.main,
        position:"relative"
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-Star">
        <Avatar src={user.img} />
        <Stack>
        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography varaint="h6" fontSize="small" color="text.secondary">
              {user.name} • {format(comment.createdAt)}
            </Typography>
            <IconButton
              sx={{
                display:
                  currentUser?._id === comment.userId ||
                  currentVideo?.userid === currentUser?._id
                    ? "block"
                    : "none",
                position:"absolute",
                top:"1px",
                right:"2px"
              }}
              onClick={handleDelete}
            >
              <DeleteIcon fontSize="small"/>
            </IconButton>
          </Stack>
        </Box>

          <Typography varaint="body2" fontSize="medium" color="text.primary">
            {comment.comment}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
