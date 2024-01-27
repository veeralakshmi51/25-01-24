import React, { useState, useEffect } from "react";
import Image2 from '../../assets/images/image2.png';
import { InputAdornment, TextField } from "@mui/material";
import { Button } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Email } from "@mui/icons-material";
interface Data{
  email:string;
}
const ForgotPassword = () => {
const [data,setData]=useState<Data>({
  email:"",
});
const navigate=useNavigate();
// const baseURL = 'http://47.32.254.89:7000/api'
// const successCode = 'MHC - 0200'


const handleRequest = async () => {
  try {
    const response = await axios.post('http://47.32.254.89:7000/api/user/forgot-password', data);
    console.log('Response:', response.data);
    alert(response.data.message.description);

    if (response.data.message && response.data.message.code === 'MHC - 0200') {
      localStorage.setItem('savedEmail', data.email);
      navigate('/verify-otp');
    }
  } catch (error:any) {
    if (error.response) {
      console.log('Server Error:', error.response.data);
      console.log('Status Code:', error.response.status);
      console.log('Headers:', error.response.headers);

      if (error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message.description}`);
      } else {
        
        alert('An unexpected error occurred. Please try again.');
      }
    } else if (error.request) {
      console.log('Request Error:', error.request);

      
      alert('Network issue. Please try again.');
    } else {
      console.log('Error:', error);

      alert('An unexpected error occurred. Please try again.');
    }
  }
};


  return (
    <div className="p-grid passcode-section" style={{ background: '#fff', width:'100vw', height:'100vh' }}>
      <div className="p-col-12 p-md-7" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', marginLeft: '-6px', height: '101%' }}>
        <img src={Image2} style={{ height: '-webkit-fill-available', marginRight: '-7px' }} alt="Image"></img>
      </div>
      <div className="col-md-5 d-flex flex-column align-items-md-center justify-content-md-center">
      <form className="rounded col-md-8" style={{ border: '1px solid #6994f0', padding: '30px' }} >

      <div className="d-flex flex-column gap-3">
        <label>Email ID</label>
      <TextField
        id="outlined-basic-1"
        label="Email"
        variant="outlined"
        fullWidth
        value={data.email}
        onChange={(e)=>setData({...data,email:e.target.value})}
        InputProps={{startAdornment:(<InputAdornment position="start"><Email style={{color:'skyblue'}}/></InputAdornment>)}}
      />
      <Button color="info" style={{fontSize:'20px'}} onClick={handleRequest}>
              Click to Send OTP
            </Button>
      </div>
      </form>
      </div>
    </div>
   
  );
};

export default ForgotPassword;