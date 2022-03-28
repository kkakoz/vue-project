import {
    post,
    get
} from '.';



export const categories = () => {
    return get("/categories")
}