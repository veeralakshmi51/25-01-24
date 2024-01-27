import axios from 'axios'
import { isLoading, setErrorMessage, setIsLoadingFalse, getBedAssignSuccess } from "./reducer"

const baseURL = 'http://47.32.254.89:7000/api'
const successCode = 'MHC - 0200'

export const getAllBed = async (dispatch: any, orgId: string) => {
    dispatch(isLoading());
    try {
      const response = await axios.get(`${baseURL}/Q15Bed/getByOccupied/${orgId}`);
      console.log('API assign response', response.data)
      if (response.data.message.code === successCode) {
        dispatch(getBedAssignSuccess(response.data.data));
      } else {
        dispatch(setErrorMessage(response.data.message.description));
      }
    } catch (error) {
      dispatch(setIsLoadingFalse());
      console.error('API error:', error);
    }
  };

  export const deletePatientAssignDetails = (id:string,org: string) => async (dispatch: any) => {
    dispatch(isLoading());
    try {
      const response = await axios.post(`${baseURL}/Q15Bed/dischargePatient/${id}`);
      console.log('Deleted Details:', response.data);
      if (response.data.message.code === successCode) {
          getAllBed(dispatch,org)
          } else {
        dispatch(setErrorMessage(response.data.message.description));
      }
    } catch (error) {
      dispatch(setIsLoadingFalse());
      console.log('API Error:', error);
    }
  };