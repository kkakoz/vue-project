import {get, post} from "./index";

export const newsfeedAdd = data => {
    return post(`/newsfeed/add`, data)
}

export const newsfeeds = data => {
    return get(`/newsfeed/page-list`, data)
}

export const followedNewsfeedsApi = data => {
    return get(`/newsfeed/followed-page-list`, data)
}