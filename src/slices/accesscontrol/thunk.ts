import axios from 'axios'
import { getAccessControlSuccess, getOrgSuccess, isLoading, setErrorMessage, setIsLoadingFalse } from "./reducer"

const baseURL = 'http://47.32.254.89:7000/api'
const successCode = 'MHC - 0200'

export const getAllAccess = async (dispatch: any) => {
    dispatch(isLoading())
    try{
        const response = await axios.get(`${baseURL}/access/getAll`)
        if(response.data.message.code === successCode) {
            dispatch(getAccessControlSuccess(response.data.data))
        } else {
            dispatch(setErrorMessage(response.data.message.description))
        }
    } catch (error) {
        dispatch(setIsLoadingFalse())
        console.log(error)
    }
}

export const getOrganization = async (dispatch: any) => {
    dispatch(isLoading())
    try {
        const response = await axios.get(`${baseURL}/org/name`)
        if(response.data.message.code === successCode){
            dispatch(getOrgSuccess(response.data.data))
        } else {
            dispatch(setErrorMessage(response.data.message.descryption))
        }
    } catch (error) {
        dispatch(setIsLoadingFalse())
        console.log(error)
    }
}