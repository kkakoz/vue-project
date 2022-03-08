import axios from 'axios'

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASEURL,
    timeout: 30000,
    validateStatus: (status) => status === 200,
})

function Add() {
    
}