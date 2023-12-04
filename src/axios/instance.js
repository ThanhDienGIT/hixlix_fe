import axios from "axios";



// Lấy token từ Local Storage
const token = localStorage.getItem('access_token');

const instance = axios.create({
     baseURL: 'http://10.102.13.8:8080/api/',
    //baseURL: 'https://3aca-115-78-10-248.ngrok-free.app/api/',
    
    headers: {
        'Authorization': `Bearer ${token}`
    },
});

export default instance;