import {
    request
} from "."


export const login = data => {
    request("/users/login", data)
}