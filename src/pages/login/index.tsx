// import React, { useEffect, useState } from "react";
// import LoginImage from "../../assets/images/login.png";
// import MHCLogo from "../../assets/images/mettlerTitle.png"
// import { useNavigate } from "react-router-dom";
// import { getOrganization, handleLogin } from "../../slices/thunk";
// import { useDispatch, useSelector } from "react-redux";
// import { TextField } from "@mui/material";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<any>();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [orgName, setOrgName] = useState("");
//   const { organization: modalOrganizations } = useSelector(
//     (state: any) => state.Access
//   );
//   useEffect(() => {
//     getOrganization(dispatch);
//   }, [dispatch]);

//   const triggerLogin = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const body = {
//       username,
//       password,
//       organization: orgName,
//     };
//     handleLogin(dispatch, body, navigate);
//   };

//   return (
//     <div className="vh-100">
//     <div className="row vh-100">
//       <div className="col-md-7 position-relative">
//         <div >
//         <p className="position-absolute" style={{color:'#fff',fontWeight:'bold',fontSize:'30px',marginLeft:'100px',marginTop:'360px'}}>Welcome to <br />Mettler Health</p>
//         <p className="position-absolute" style={{color:'#fff',fontSize:'15px',marginLeft:'100px',marginTop:'470px'}}>we specialize in developing cutting-edge <br/> software solutions for the healthcare industry.</p>
//           {/* <p className="position-absolute" style={{color:'#fff',fontWeight:'bold',fontSize:'30px'}}>Mettler Health</p> */}
//           <img className="position-absolute" style={{height:'25px',width:'200px',marginLeft:'70px',marginTop:'80px'}} src={MHCLogo} alt="MHC Logo" />
//           <img
//           src={LoginImage}
//           alt="LogIn Image"
//           className="img-fluid vh-100"
//           // style={{ objectFit:"cover", height: '100vh', paddingBottom: "10px" }}
//           />
//         </div>
//       </div>
//       <div className="col-md-5 d-flex flex-column align-items-md-center justify-content-md-center">
//         <form className="rounded col-md-8" style={{ border: '1px solid #0f3995', padding: '30px' }} onSubmit={triggerLogin}>
//           <div className="d-flex flex-column gap-3">
//           <TextField id="outlined-basic-1" label="Username" variant="outlined" fullWidth onChange={(e:any) => setUsername(e.target.value)}/>

//           <TextField id="outlined-basic-1" label="Password" variant="outlined" fullWidth onChange={(e:any) => setPassword(e.target.value)}/>
//           </div>
//           <div className="d-flex mt-2 row">
//           <div className="form-check col-md-4">
//             <input
//               type="checkbox"
//               className="form-check-input p-0"
//               id="exampleCheck1"
//             />
//             <label className="form-check-label" style={{fontSize:'10px'}} htmlFor="exampleCheck1">
//               Remember Me
//             </label>
//           </div>
//             {/* <p className="col-md-8 text-end" style={{fontSize:'10px'}}>Forget Password?</p> */}

//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary col-md-12"
//           >
//             Login
//           </button>
//           <p className="col-md-8 text-end mt-3" style={{fontSize:'20px'}}>Forgot Password?</p>
//         </form>
//         </div>
//         </div>
//       </div>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import LoginImage from "../../assets/images/login.png";
import MHCLogo from "../../assets/images/mettlerTitle.png";
import { Link, useNavigate } from "react-router-dom";
import { getOrganization, handleLogin } from "../../slices/thunk";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useRef } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const usernameInputRef = useRef<HTMLInputElement | null>(null); // Ref for username input
  const { organization: modalOrganizations } = useSelector(
    (state: any) => state.Access
  );
  useEffect(() => {
    getOrganization(dispatch);
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, [dispatch]);

  const triggerLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      username,
      password,
      organization: orgName,
    };
    handleLogin(dispatch, body, navigate);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="d-flex vh-100 ">
      <div className="col-md-7 position-relative p-0">
        <div>
          <p
            className="position-absolute"
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "30px",
              marginLeft: "100px",
              marginTop: "360px",
            }}
          >
            Welcome to <br />
            Mettler Health
          </p>
          <p
            className="position-absolute"
            style={{
              color: "#fff",
              fontSize: "15px",
              marginLeft: "100px",
              marginTop: "470px",
            }}
          >
            we specialize in developing cutting-edge <br /> software solutions
            for the healthcare industry.
          </p>
          <img
            className="position-absolute"
            style={{
              height: "25px",
              width: "200px",
              marginLeft: "70px",
              marginTop: "80px",
            }}
            src={MHCLogo}
            alt="MHC Logo"
          />
          <img
            src={LoginImage}
            alt="LogIn Image"
            className="img-fluid"
            style={{ objectFit: "cover", height: "100vh" }}
          />
        </div>
      </div>
      <div className="col-md-5 d-flex flex-column align-items-center justify-content-md-center overflow">
        <form
          className="rounded col-md-9 "
          style={{ border: "1px solid #0f3995", padding: "30px" }}
          onSubmit={triggerLogin}
        >
          {/* <div className="d-flex flex-column gap-3">
          <TextField id="outlined-basic-1" label="Username" variant="outlined" fullWidth onChange={(e:any) => setUsername(e.target.value)}/>
        
          <TextField id="outlined-basic-1" label="Password" variant="outlined" fullWidth onChange={(e:any) => setPassword(e.target.value)}/>
          </div> */}
          <div className="d-flex flex-column gap-3">
            <TextField
              id="outlined-basic-1"
              label="Username"
              variant="outlined"
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle style={{ color: "darkblue" }} />
                  </InputAdornment>
                ),
              }}
              inputRef={(input)=>{usernameInputRef.current=input;
              }}
            />

            <TextField
              id="outlined-basic-2"
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: "darkblue" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="d-flex mt-4 m-2 row">
            <div className="form-check col-md-6">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="exampleCheck1"
              />
              <label
                className="form-check-label"
                style={{ fontSize: "20px" }}
                htmlFor="exampleCheck1"
              >
                Remember Me
              </label>
            </div>
            {/* <p className="col-md-8 text-end" style={{fontSize:'10px'}}>Forget Password?</p> */}
          </div>
          <button type="submit" className="btn btn-primary col-md-12">
            Login
          </button>
          <div className="mt-3" style={{ fontSize: "20px" }}>
            Forgot Password
            <Link to="/forgot-password">{""} Click Here!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
