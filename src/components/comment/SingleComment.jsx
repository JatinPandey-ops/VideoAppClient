import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { format } from "timeago.js";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function SingleComment({ comment }) {
  const [user, setUser] = useState({});
  const theme = useTheme();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`users/find/${comment.userId}`);
      setUser(res.data);
    };
    fetch();
  }, [comment]);
  return (
    <Box
      sx={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "2%",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Stack direction="row" spacing={2}>
        <Avatar src={user.img} />
        <Stack spacing={0.5}>
          <Stack direction="row" justifyContent="space-between">
            <Typography varaint="body2" fontSize="small" color="text.secondary">
              {user.name} • {format(comment.createdAt)}
            </Typography>

            <IconButton
              sx={{
                display:
                  currentUser?._id === comment.userId ||
                  currentVideo?.userid === currentUser?._id
                    ? "block"
                    : "none",
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Stack>

          <Typography varaint="body2" fontSize="medium" color="text.primary">
            {comment.comment}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
