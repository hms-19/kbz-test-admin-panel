import axios from "axios";

const PRODUCTION_URL = 'http://52.197.235.216/api/v1'
const DEVELOPMENT_URL = 'http://127.0.0.1/api/v1'

let baseUrl = process.env.REACT_ENV == 'development' ? DEVELOPMENT_URL : PRODUCTION_URL
const instance = axios.create({
        baseURL: baseUrl,
        timeout: 8000,
        headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            withCredentials: true,
        }
})

export default instance