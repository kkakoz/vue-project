import {
    post,
    get
} from '.';

export const login = data => {
    return post("/user/login", data)
}

export const register = data => {
    return post("/user/register", data)
}

export const current = () => {
    return get("/user/current")
}

export const follow = (data) => {
    return post("/follow/add", data)
}