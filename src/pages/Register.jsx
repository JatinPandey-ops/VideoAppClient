import {
  Box,
  Button,
  Container,
  InputBase,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("auth/signup", {
        name,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      res.status === 200 && navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
    }
  };
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Stack spacing={2} alignItems="center">
          <Typography gutterBottom variant="h5">
            Signup
          </Typography>
          <Container width="100%">
            <Stack spacing={3}>
              <InputBase
                fullWidth
                color="secondary"
                variant="outlined"
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
              />
              <InputBase
                fullWidth
                color="secondary"
                variant="outlined"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputBase
                fullWidth
                color="secondary"
                variant="outlined"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
          </Container>
          <Box>
            <Button variant="contained" onClick={handleSubmit}>Signup</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
