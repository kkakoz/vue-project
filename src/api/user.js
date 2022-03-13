import {
    request
} from "."


export const login = data => {
    request("/api/login", data)
}