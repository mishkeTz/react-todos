import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-9b963.firebaseio.com/'
});

export default instance;