import { Box, Stack, Typography } from "@mui/material";
import SearchOutlined from "@mui/icons-material/Search";
import React from "react";

export default function BlankPage({ message, type }) {
  return (
    <>
      {type === "search" ? (
        <Box sx={{height:"100%",width:"100%"}}>

        <Stack alignItems="center" spacing={2}>
          <Box>
            <SearchOutlined sx={{ fontSize: "5rem", color: "red" }} />
          </Box>
          <Typography variant="h6">Search</Typography>
        </Stack>
        </Box>
      ) : (
        <Box sx={{height:"100%",width:"100%"}}>
        <Stack alignItems="center" spacing={2}>
          <Box sx={{ fontSize: "5rem", color: "red" }}>ಠ_ಠ</Box>
          <Typography variant="h6">{message}</Typography>
        </Stack>

        </Box>
      )}
    </>
  );
}
