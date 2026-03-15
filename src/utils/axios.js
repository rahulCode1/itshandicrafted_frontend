import axios from "axios"


export const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

export const privateApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})


privateApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})