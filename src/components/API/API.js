import axios from "axios";

export const privateApi = axios.create({
    baseURL: 'http://localhost:3000/api',
   
})

export const PublickApi = axios.create({
    baseURL: 'http://localhost:3000/api',
   
})
