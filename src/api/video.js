import {
    post,
    get
} from '.';


export const videos = videoId => {
    return get(`/videos${videoId}`)
}

