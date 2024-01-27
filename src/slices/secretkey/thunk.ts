import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseURL = 'http://47.32.254.89:7000/api';
const successCode = 'MHC - 0200';


 export const SecretKeyVerify = async (body: any, userType: any,  navigate: (p: string) => void) => {
    try {
        const response = await axios.post(`${baseURL}/user/verify`, body);
               
      
        if (response.data.message.code === successCode) {
            localStorage.setItem('authStaff', 'Verified');
           
            if (userType === "Admin") {
                navigate('/q15-staff-configuration');
            } else if (userType === "Super Admin") {
                navigate('/organization-details');
            }else if (userType === "System Admin") {
                navigate('/staff-table');
            } else navigate('/staff-table')
        } else {
            alert("Login failed: " + response.data.message.description);
        }
    
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
    }
   
};