

import {get, post} from "./index";

export const addHistoryApi = data=> {
    return post(`/history/add`, data)
}

export const getHistoryApi = data => {
    return get('/history/get', data)
}

export const getHistoriesApi = data => {
    return get('/history/page-list', data)
}