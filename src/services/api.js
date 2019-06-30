import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.myjson.com/bins'
})

export default api;