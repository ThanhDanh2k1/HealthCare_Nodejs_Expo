import { post } from "../utils/request";

export const createCalendar = async (body) => {
    return await post('/calendar/create', {}, body)
}

export const updateCalendar = async (body) => {
    return await post('/calendar/update', {}, body)
}

export const getCalendar = async (body) => {
    return await post('/calendar/get', {}, body)
}

export const getCalendarByPatient = async (body) => {
    return await post('/calendar/patient', {}, body)
}

export const getCalendarHistory = async (body) => {
    return await post('/calendar/history', {}, body)
}

export const cancelCalendar = async (body) => {
    return await post('/calendar/cancel', {}, body)
}
