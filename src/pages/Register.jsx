import {
  Box,
  Button,
  Container,
  InputBase,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import PersonIcon from '@mui/icons-material/Person';
import { toast } from "react-toastify";

export default function Register() {
  const theme = useTheme()
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("auth/signup", {
        name,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      toast(`Logged in as ${res.data.name}`,{theme:theme.palette.mode })
      setLoading(false)
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
          <LoadingButton
              loading={loading}
              loadingPosition="start"
              onClick={handleSubmit}
              variant="contained"
              startIcon={<PersonIcon />}
            >
              Register
            </LoadingButton>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
