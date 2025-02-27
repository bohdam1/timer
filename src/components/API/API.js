import axios from "axios";

export const privateApi = axios.create({
    baseURL: 'https://goit-node-rest-api-c9hs.onrender.com/api',
   
})

export const PublickApi = axios.create({
    baseURL: 'https://goit-node-rest-api-c9hs.onrender.com/api',
   
})
