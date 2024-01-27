import axios from 'axios'
import { isLoading, setErrorMessage, setIsLoadingFalse, getShiftStartTimeSuccess, getShiftDurationSuccess } from "./reducer"

const baseURL = 'http://47.32.254.89:7000/api'
const successCode = 'MHC - 0200'

export const getOrgByID = async (dispatch: any,orgId:string) => {
    dispatch(isLoading());
    try {
        const response = await axios.get(`${baseURL}/org/getById/${orgId}`);

      if (response.data.message.code === successCode) {
        dispatch(getShiftStartTimeSuccess(response.data.data.shift.startTime));
        dispatch(getShiftDurationSuccess(response.data.data.shift.duration));
      } else {
        dispatch(setErrorMessage(response.data.message.description));
      }
    } catch (error) {
      dispatch(setIsLoadingFalse());
      console.error(error);
    }
  };
