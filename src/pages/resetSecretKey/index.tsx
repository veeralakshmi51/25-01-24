import React, { useState, useEffect } from "react";
import Image2 from '../../assets/images/image2.png';
import { InputAdornment, TextField } from "@mui/material";
import { Button } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Email } from "@mui/icons-material";
import { baseURL } from "../../configuration/url";
interface Data{
  email:string;
  jwt:string;
}
const ResetSecretKey = () => {
  const jwt = useSelector((state: any) => state.Login.jwt);
 const [data,setData]=useState<Data>({
  email:"",
  jwt:"",
});
const navigate=useNavigate();
// const baseURL = 'http://47.32.254.89:7000/api'
// const successCode = 'MHC - 0200'
const handleRequest = async () => {
  try {
    const response = await axios.post(`${baseURL}/user/resetSecretKey`, data);
    console.log('ResetKey Response:', response.data);
    alert(response.data.message.description);
    if (response.data.message && response.data.message.code === 'MHC - 0200') {
      localStorage.setItem('loginResponse', JSON.stringify(response.data));

      navigate('/secret-key');
    }
  } catch (error) {
    console.log('jwt',jwt)
    alert('Error during reset secret key');
  }
}

useEffect(() => {
  const savedJwt = localStorage.getItem('jwtToken');

  if (savedJwt) {
    setData((prevData) => ({ ...prevData, jwt: savedJwt }));
  } else {
    console.log('No Jwt Found in Local Storage');
  }

  const userEmail = localStorage.getItem('userDetailEmail');
  if (userEmail) {
    setData((prevData) => ({ ...prevData, email: userEmail }));
  } else {
    const storedLoginResponse = localStorage.getItem('loginResponse');
    if (storedLoginResponse) {
      const loginResponse = JSON.parse(storedLoginResponse);
      const userDetailEmailFromResponse = loginResponse.data.userDetail.email;
      setData((prevData) => ({ ...prevData, email: userDetailEmailFromResponse }));
    } else {
      console.log('No User Email Found in Local Storage');
    }
  }
}, []);


  return (
    <div className="d-flex vh-100 ">
    <div className="col-md-7 position-relative p-0">
        <img src={Image2}  alt="Image" className="img-fluid" style={{objectFit:'cover',height:'100vh'}}></img>
      </div>
      <div className="col-md-5 d-flex flex-column align-items-md-center justify-content-md-center">
      <form className="rounded col-md-8" style={{ border: '1px solid #6994f0', padding: '30px' }} >

      <div className="d-flex flex-column gap-3">
        <label>Email </label>
      <TextField
        id="outlined-basic-1"
        label="Email"
        variant="outlined"
        fullWidth
        value={data.email}
        className="p-10"
        onChange={(e)=>setData({...data,email:e.target.value})}
        InputProps={{startAdornment:(<InputAdornment position="start"><Email style={{color:'skyblue'}}/></InputAdornment>),readOnly:true}}
        
      />
      <Button color="info" style={{fontSize:'20px'}} onClick={handleRequest}>
              Click to Send ResetKey
            </Button>
      </div>
      </form>
      </div>
    </div>
   
  );
};

export default ResetSecretKey;