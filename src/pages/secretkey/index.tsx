import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import "react-dropdown-tree-select/dist/styles.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Image1 from '../../assets/images/Image1.png';
import { useSelector } from "react-redux";
import { SecretKeyVerify }  from "../../slices/secretkey/thunk";
import { useNavigate } from "react-router-dom";
import { getOrganization } from "../../slices/thunk";

const SecretKey = () => {
  const {jwt, userType } = useSelector((state: any) => state.Login);
  const navigate = useNavigate()
  const [secretKey, setSecretKey] = useState("");
  const otpInputsRef = useRef<HTMLInputElement[]>([]);
  
  const handlePinChange = (index: number, value: string) => {
    const newSecretKey = secretKey.split("");
    newSecretKey[index] = value;
    setSecretKey(newSecretKey.join(""));
  
    // Automatically move focus to the next input
    if (index < otpInputsRef.current.length - 1 && value !== "") {
      otpInputsRef.current[index + 1].focus();
    }
  
    // If it's the last input and the value is empty, move focus to the previous input
    if (index === otpInputsRef.current.length - 1 && value === "") {
      otpInputsRef.current[index - 1].focus();
    }
  
    // If the last input is empty and not the first input, move focus to the previous input
    if (index === otpInputsRef.current.length - 1 && value === "" && index > 0) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (otpInputsRef.current.length > 0) {
      otpInputsRef.current[0].focus();
    }
  }, []);

  const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      // Clear the current input
      const newSecretKey = secretKey.split("");
      newSecretKey[index] = "";
      setSecretKey(newSecretKey.join(""));
  
      // If not in the first input, move focus to the previous input after a small delay
      if (index > 0) {
        setTimeout(() => {
          otpInputsRef.current[index - 1].focus();
        }, 10); // Adjust the delay as needed
      }
    }
  };
  const handleVerify = () => {
    const body ={
      secretKey,
      jwt
    }
    SecretKeyVerify(body,userType,navigate)
  }
  useEffect(() => {
    const handleBackspaceGlobal = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && secretKey.length > 0) {
        const newSecretKey = secretKey.split("");
        newSecretKey[secretKey.length - 1] = "";
        setSecretKey(newSecretKey.join(""));
      }
    };

    document.addEventListener("keydown", handleBackspaceGlobal);

    return () => {
      document.removeEventListener("keydown", handleBackspaceGlobal);
    };
  }, [secretKey]);

  useEffect(() => {
    return () => {
      setSecretKey("");
    };
  }, []);


  return (
    <div className="row d-flex h-100 w-100">
    <div className="col-md-6">
      <img className='img-fluid' style={{height:'99.5vh',width:'50vw'}} src={Image1} alt="Secret"></img>
    </div>
    
    <div className="col-md-6 d-flex flex-column justify-content-center align-items-center ">
        <div>
          <span style={{ display: 'block' }} className="passCodeText">
            Enter your Passcode :
          </span>
        </div>
        <div className=" p-4 d-flex gap-3" >
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              id={`pinNumber${index}`}
              type="password"
              className={`passwordText${index + 1}`}
              name="pinNumber"
              onChange={(e) => handlePinChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              maxLength={1}
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #0f3995',
                textAlign: 'center',
                // padding: '15px',
                borderRadius: '8px'
              }}
              ref={(ref) => {
                if (ref) {
                  otpInputsRef.current[index] = ref;
                }
              }}
            />
          ))}
        </div>
        <div className="buttonPasscode">
          <Button
            onClick={handleVerify}
            style={{
              width: '321px',
              position: 'relative',
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              fontSize: '16px',
              height: '48px',
              backgroundColor: '#1F489F',
              color:'#fff'
            }}
            label="Submit"
          ></Button>
        </div>
        <a style={{ cursor: 'pointer',color:'blue'}} onClick={()=>navigate('/resetSecretKey')}>
          <div className="forgotPassCode p-3">Forgot Passcode?</div>
        </a>
    </div>
  </div>
  );
};

export default SecretKey;