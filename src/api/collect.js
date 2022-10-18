
import {get, post} from "./index";

export const collect = data=> {
    console.log("data = ", data)
    return post(`/collect/add`, data)
}