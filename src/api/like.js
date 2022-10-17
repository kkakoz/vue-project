import {get, post} from "./index";

export const like = data=> {
    console.log("data = ", data)
    return post(`/like/add`, data)
}