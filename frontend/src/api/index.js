import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL

export const api = axios.create({
    baseURL: apiUrl,
})

export function setApiAuth(username, password) {
    const base64Auth = btoa(`${username}:${password}`)
    api.defaults.headers.common['Authorization'] = `Basic ${base64Auth}`
}

export function unsetApiAuth() {
    api.defaults.headers.common['Authorization'] = undefined
}
