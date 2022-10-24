import {
    post,
    get
} from '.';

export const getComments = data => {
    return get(`/comment/list`, data)
}

export const getSubComments = data => {
    return get(`/sub-comment/list`, data)
}


export const addComment = data => {
    return post(`/comment/add`, data)
}

export const addSubComment = data => {
    return post(`/sub-comment/add`, data)
}
