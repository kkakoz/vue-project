
import {get, post} from "./index";

export const collect = data=> {
    return post(`/collect/add`, data)
}

export const getCollectListApi = data=> {
    return get(`/collect/page-list`, data)
}