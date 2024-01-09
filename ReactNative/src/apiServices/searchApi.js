import { post } from "../utils/request";

export const getDoctor = async (body) => {
    return await post('/search/doctor', {}, body)
}

export const searchData = async (body) => {
    return await post('/search/data', {}, body)
}
