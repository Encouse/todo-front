import Axios from 'axios'


const instance = axios.create({
  baseURL: 'http:127.0.0.1:8000',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'},
});

axios.interceptors.request.use(function (config) {
    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
