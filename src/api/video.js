import {
    post,
    get
} from '.';

export const getVideos = data => {
    return get(`/video/list`, data)
}

export const getVideo  = data => {
    return get(`/video/get`,data)
}

export const videoUserState = data => {
    return get(`/video/user-state`, data)
}

export const getRecommendVideos = data => {
    return get(`/video/recommend`, data)
}

export const getRankingsApi = data => {
    return get(`/video/rankings`, data)
}
