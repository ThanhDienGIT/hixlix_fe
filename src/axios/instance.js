import axios from "axios";



// Lấy token từ Local Storage
const token = localStorage.getItem('access_token');

const instance = axios.create({
     baseURL: 'http://113.164.176.30:9393/api/',
    //baseURL: 'https://3aca-115-78-10-248.ngrok-free.app/api/',
    
    headers: {
        'Authorization': `Bearer ${token}`
    },
});

export default instance;