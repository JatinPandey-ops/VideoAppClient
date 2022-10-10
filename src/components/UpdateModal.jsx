import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { app } from "../Firebase";
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UpdateModal({open,type,setOpen}) {
  const [img, setImg] = useState(null)
  const [bg, setBg] = useState(null)
  const [percentage, setPercentage] = useState(0)
  const [input,setInput] = useState({})
  const {currentUser} = useSelector((state) => state.user)
  const path = useLocation().pathname.split('/')[2]
  const dispatch = useDispatch()

  const renderTitle = () => {
    if (type === "profile") {
      return <Typography id="modal-modal-title" variant="h6" component="h2">  Update Your Profile  </Typography>
    }if (type === "cover") {
      return <Typography id="modal-modal-title" variant="h6" component="h2">  Update Your Cover  </Typography>
    }else{
    return <Typography id="modal-modal-title" variant="h6" component="h2"> Update Your Username   </Typography>
    }
  }

  const renderInput = () => {
    if (type === "profile") {
     return (
      percentage > 0 ? `Uploading ${percentage} %` :
      <TextField
      name='img'
       type="file"
      accept="image/*"
      onChange={(e) => {setImg(e.target.files[0])}}/>
      )
     }if (type === "cover") {
       return (
        percentage > 0 ? `Uploading ${percentage} %` :
         <TextField
         name='BackgroundImg'
          type="file"
         accept="image/*"
         onChange={(e) => {setBg(e.target.files[0])}}/>
       )
     }else{
      return (
       <TextField
       type="text"
       fullWidth
       label="Enter New Username"
       margin="dense"
       variant="outlined"
       placeholder=""
       name="name"
       onChange={handleChange}
       color="secondary"
     />
      )
     }
  }

  const handleChange = (e) => {
    setInput((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleUpload =  async () => {
    await axios.put(`users/${path}`,input,{withCredentials : true})
    console.log("user updated")
    const res = await axios.get(`users/find/${path}`)
    dispatch(loginSuccess(res.data))
    console.log("uSER dispatch")
    
  }

  const uploadFile = (file,field,folder) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(Math.round(progress))
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInput((prev) => {
            return { ...prev, [field]: downloadURL };
          });
        });
      }
    );
  };

  const deleteFile = (file,folder) => {
    const storage = getStorage(app)
    const storageref = ref(storage , folder + file)
  deleteObject(storageref).then(() => {
      console.log("file deleted")
    } ).catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    // const pfpName = currentUser.img.split("%")[1].split("?")[0].slice(2)
    // deleteFile(pfpName,"profiles/")
    img && uploadFile(img,"img","profiles/")
  },[img])

  useEffect(() => {
    // const bgImgName = currentUser.backgroundImg.split("%")[1].split("?")[0].slice(2)
    // deleteFile(bgImgName,"Cover/")
    bg && uploadFile(bg,"backgroundImg","Cover/")
  },[bg])

  return (
<Modal
  open={open}
  onClose={(e) => {setOpen(false)}}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
      {renderTitle()}
    <Box>
      {renderInput()}
    </Box>
    <Button variant="contained" onClick={handleUpload}>Upload</Button>
  </Box>
</Modal>
  )
}

