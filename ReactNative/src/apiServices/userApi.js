import { post, put, patch } from "../utils/request";

export const register = async (body) => {
    return await post('/user/register', {}, body)
}

export const login = async (body) => {
    return await post('/user/login', {}, body)
}

export const sendOtp = async (body) => {
    return await post('/user/otp', {}, body)
}

export const verifyOtp = async (body) => {
    return await post('/user/verify', {}, body)
}

export const findEmail = async (body) => {
    return await post('/user/find', {}, body)
}


export const getListDoctors = async (body) => {
    return await post('/user/allDoctors', {}, body)
}

export const updateUser = async (body) => {
    return await put('/user/update', {}, body)
}

export const forgetUser = async (body) => {
    return await patch('/user/forget', {}, body)
}

export const changePass = async (body) => {
    return await patch('/user/changePass', {}, body)
}
