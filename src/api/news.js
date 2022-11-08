import {get, post} from "./index";

export const newsfeedAdd = data=> {
    return post(`/newsfeed/add`, data)
}