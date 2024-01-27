import axios from "axios"
import { endLoading, getPSConfigSuccess, getRNInchargeListSuccess, getSocialWorkerListSuceess, setErrorMessage, startLoading } from "./reducer"

const baseURL = 'http://47.32.254.89:7000/api'
const successCode = 'MHC - 0200'
export const getPSConfigByDate = async (dispatch: any, date: any) => {
    dispatch(startLoading())
    try {
        const response = await axios.get(`${baseURL}/PSConfig/getByDate/${date}`)
        if (response.data.message.code === successCode) {
            dispatch(getPSConfigSuccess(response.data.data.shift))
        } else {
            dispatch(endLoading())
           console.log(response.data.message.description)
           dispatch(getPSConfigSuccess([]))

        }
    } catch (error) {
        dispatch(endLoading())
        console.log(error)
    }
}

export const getAllRNIncharge = async (dispatch: any, role: string, orgId: string) => {
    dispatch(startLoading())
    try {
       const response = await axios.get(`${baseURL}/staff/role/${role}/${orgId}`)
       if (response.data.message.code === successCode) {
        dispatch(getRNInchargeListSuccess(response.data.data))
       } else {
        dispatch(endLoading())
       }
    } catch (error) {
        dispatch(endLoading())
        console.log(error)
    }
}

export const getAllSocialWorkers = async (dispatch: any, role: string, orgId: string) => {
    dispatch(startLoading())
    try {
       const response = await axios.get(`${baseURL}/staff/role/${role}/${orgId}`)
       if (response.data.message.code === successCode) {
        dispatch(getSocialWorkerListSuceess(response.data.data))
       } else {
        // alert(response.data.message.description)
       }
    } catch (error) {
        dispatch(endLoading())
        console.log(error)
    }
}

export const postPSConfig = async (dispatch: any) => {
    dispatch(startLoading())
    try {
        
    } catch (error) {
        dispatch(endLoading())
        console.log(error)
    }
}