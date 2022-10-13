import {
    post,
    get
} from '.';

export const getVideos = data => {
    return get(`/video/list`, data)
}

export const getVideo = data => {
    return get(`/video/get`,data)
}

export const state = data => {
    return get(`/video/state`, data)
}
