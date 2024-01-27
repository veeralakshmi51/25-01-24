import axios from 'axios'
import { isLoading, setErrorMessage, setIsLoadingFalse, getStaffSuccess } from "./reducer"

const baseURL = 'http://47.32.254.89:7000/api'
const successCode = 'MHC - 0200'

export const getAllStaff = async (dispatch: any,organization:string) => {
    dispatch(isLoading());
    try {
      const response = await axios.get(`${baseURL}/staff/get/ActiveStaff/${organization}`);
      console.log('API response',response.data)
      if (response.data.message.code === successCode) {
        dispatch(getStaffSuccess(response.data.data));
      } else {
        dispatch(setErrorMessage(response.data.message.description));
      }
    } catch (error) {
      dispatch(setIsLoadingFalse());
      console.error('API error:',error);
    }
  };

export const deleteStaffDetails=(username:string,organization:string)=>async(dispatch:any)=>{
  dispatch(isLoading());
 try{
  const response=await axios.delete(`${baseURL}/staff/delete/${username}`);
  console.log('Deleted Staff Details:',response.data)
  if(response.data.message.code===successCode){
    getAllStaff(dispatch,organization)
  }else{
    dispatch(setErrorMessage(response.data.message.description))
  }
 }catch(error){
  dispatch(setIsLoadingFalse())
  console.log('API Error:',error)
}
}

export const updateStaffDetails = (id: string, data: any,organization:string) => async (
  dispatch: any
) => {
  dispatch(isLoading());
  console.log('Updating staff with ID:', id);
  console.log('Data to be sent:', data);

  try {
    const jsonData=JSON.stringify(data)
    console.log("JSON Data:",jsonData)
    const response = await axios.put(`${baseURL}/staff/update/${id}`, jsonData,{
     headers:{
      'Content-Type': 'application/json',
     },
    });

    console.log('Update API Response:', data);
    
    if (response.data.message.code === successCode) {
      dispatch(setIsLoadingFalse());
      //setEditModal(false);
      console.log('Staff details updated successfully!');
      // alert(response.data.message.description)
      getAllStaff(dispatch,organization);
    } else {
      dispatch(setErrorMessage(response.data.message.description));
      console.error('Update failed:', response.data.message.description);
      alert(response.data.message.description);
    }
  } catch (error) {
    dispatch(setIsLoadingFalse());
    console.log('API error:', error);
    console.error('API error:', error);
  }
};