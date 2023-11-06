import axios from "axios";



// Lấy token từ Local Storage
const token = localStorage.getItem('access_token');

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Authorization': `Bearer ${token}`
    },
});

export default instance;