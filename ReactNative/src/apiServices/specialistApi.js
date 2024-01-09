import { post } from "../utils/request";

export const getSpecialists = async (body) => {
    return await post('/specialist/get', {}, body)
}
