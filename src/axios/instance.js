import axios from "axios";



// Lấy token từ Local Storage
const token = localStorage.getItem('access_token');

const instance = axios.create({
    baseURL: 'http://10.102.13.8:8080/api/',
    headers: {
        'Authorization': `Bearer ${token}`
    },
});

export default instance;