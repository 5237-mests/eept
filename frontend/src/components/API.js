import axios from "axios";

const con = process.env.REACT_APP_API;
const API = axios.create({
    baseURL: con,
    withCredentials:true,
})
API.defaults.withCredentials = true;
export default API


// baseURL: 'http://localhost:8000/',
