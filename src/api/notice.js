

import {
    post,
    get
} from '.';

export const unReadCountApi = data => {
    return get("/notice/un-read-count", data)
}

export const noticeListApi = data => {
    return get("/notice/list", data)
}

export const readAllApi = data => {
    return post("/notice/read-all", data)
}
