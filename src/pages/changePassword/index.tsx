import React, { useState, useEffect } from "react";
import Image3 from '../../assets/images/image3.png';
import { TextField,InputAdornment} from "@mui/material";
import { Button } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../configuration/url";
import { Security,Lock,Visibility,VisibilityOff} from "@mui/icons-material";
import { IconButton } from "@mui/material";
interface Data{
  email:string;
  newPassword:string;
  confirmNewPass:string;
}
const ChangePassword = () => {  
const [showPassword, setShowPassword] = useState(false);
const [confirmPassword,setConfirmPassword]=useState(false);
const [data,setData]=useState<Data>({
  email:"",
  confirmNewPass:"",
  newPassword:""
});
const navigate=useNavigate();

useEffect(()=>{
  const savedEmail=localStorage.getItem('savedEmail');
  if(savedEmail){
    setData((prevData)=>({...prevData,email:savedEmail}));
  } else{
    console.log('No Email found in local storage');
  }
},[]);
 const handleRequest=async()=>{
  try{
    const response=await axios.post(`${baseURL}/user/reset-password`,data);
    console.log('Response:',response.data);
   if(response.data.message && response.data.message.code === 'MHC - 0200')
   alert(response.data.message.description);
    navigate('/login');
  } catch(error){
    console.log('Error:',error)
  }
 }
  return (
    <div className="p-grid passcode-section" style={{ background: '#fff', width:'100vw', height:'100vh' }}>
      <div className="p-col-12 p-md-7" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', marginLeft: '-6px', height: '101%' }}>
        <img src={Image3} style={{ height: '-webkit-fill-available', marginRight: '-7px' }} alt="Image"></img>
      </div>
      <div className="col-md-5 d-flex flex-column align-items-md-center justify-content-md-center">
      <form className="rounded col-md-8" style={{ border: '1px solid #6994f0', padding: '30px' }} >

      <div className="d-flex flex-column gap-3">
        <label>Reset Password</label>
      
        <TextField
              id="outlined-basic-2"
              label="New Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={data.newPassword}
              onChange={(e) => setData({ ...data, newPassword: e.target.value })}
              InputProps={{
                startAdornment: (<InputAdornment position="start"><Security style={{ color: 'skyblue' }} /></InputAdornment>),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
      <TextField
        id="outlined-basic-3"
        label="Confirm Password"
        variant="outlined"
        fullWidth
        type={confirmPassword?'text':'password'}
        value={data.confirmNewPass}
        onChange={(e)=>setData({...data,confirmNewPass:e.target.value})}
        InputProps={{
          startAdornment: (<InputAdornment position="start"><Lock style={{ color: 'skyblue' }} /></InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setConfirmPassword(!confirmPassword)} edge="end">
                {confirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button color="info" style={{fontSize:'20px'}} onClick={handleRequest}>
              Change Password
            </Button>
      </div>
      </form>
      </div>
    </div>
   
  );
};

export default ChangePassword;