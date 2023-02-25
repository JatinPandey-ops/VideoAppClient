import { Box, Stack, TextField, Typography, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { AlertContext } from '../context/AlertContext';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { useEffect } from 'react';


export default function Login() {
  const theme = useTheme()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const alertContext = useContext(AlertContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true)
    dispatch(loginStart());
    try {
      const res = await axios.post("auth/signin", { email, password }, { withCredentials: true })
      dispatch(loginSuccess(res.data))
      setLoading(false)
      toast(`Logged in as ${res.data.name}`, { theme: theme.palette.mode })
      res.status === 200 && navigate("/")

    } catch (error) {
      if (error.response.data.status === 404) {
        alertContext.setType("loginErr")
        alertContext.setOpen(true)
        alertContext.setText(`No account found with ${email}`)
      } if (error.response.data.status === 400) {
        alertContext.setType("loginErr")
        alertContext.setOpen(true)
        alertContext.setText("Wrong Password")
      }
      dispatch(loginFailure())
    }
  }

    const keyDownHandler = event => {
    if (event.keyCode === 13) {
        event.preventDefault();
        handleSubmit();
      }
    };

  return (
    <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h3" fontSize="large">Signin</Typography>
          <Typography gutterBottom variant="body2" fontSize="medium">To continue to app</Typography>
          <Box width="100%">
            <Stack spacing={3}>
              <TextField fullWidth color="secondary" variant="outlined" placeholder='Email' onChange={e => setEmail(e.target.value)} />
              <TextField fullWidth color="secondary" variant="outlined" placeholder='Password' onChange={e => setPassword(e.target.value)} />

            </Stack>
          </Box>
          <Box>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              onClick={handleSubmit}
              variant="contained"
              startIcon={<LoginIcon />}
              onKeyDownCapture={keyDownHandler}
            >
              Signin
            </LoadingButton>
          </Box>
          <Box>
            <Typography variant="body2" component="span"> New user?</Typography>
            <Link to="/signup">
              <Typography variant="body2" component="span"> Register</Typography>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
