import { get } from "../utils/request";

export const getTest = (params) => get('/api/breeds/image/random', params)