import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://chat-app-server-agio.onrender.com',
});

export default axiosInstance;
