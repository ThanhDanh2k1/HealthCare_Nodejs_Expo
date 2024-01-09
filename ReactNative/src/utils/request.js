import axios from 'axios'
import { ENDPOINT } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosRequest = async ({ method, url, data = null, headers = {} }) => {
    try {
        let token = await AsyncStorage.getItem('token')

        let defaultHeaders = {
            'Content-Type': 'application/json'
        }

        if (token) {
            defaultHeaders = { ...defaultHeaders, token }
        }

        const response = await axios({
            method,
            url: ENDPOINT + url,
            data,
            headers: defaultHeaders,
        })


        return response
    } catch (error) {
        return error.response
    }
}

export const get = async (url, headers) =>
    await axiosRequest({ method: 'GET', url, headers })

export const post = async (url, headers, data) =>
    await axiosRequest({ method: 'POST', url, headers, data })

export const put = async (url, headers, data) =>
    await axiosRequest({ method: 'PUT', url, headers, data })

export const patch = async (url, headers, data) =>
    await axiosRequest({ method: 'PATCH', url, headers, data })

export const destroy = async (url, headers, data) =>
    await axiosRequest({ method: 'DELETE', url, headers, data })

