/* eslint-disable */
import axios from 'axios'
import store from './store'

const API_URL = process.env.VUE_APP_API_PATH || 'http://localhost:8080/api'

const apiService = axios.create({
  baseURL: API_URL,
  params: {} // do not remove this, its added to add params later in the config
});

if( localStorage.getItem('UHZ') ){
  apiService.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('UHZ')).status.token;
}

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })
  
  failedQueue = [];
}

apiService.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const originalRequest = error.config;
  
  if (error.response.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise(function(resolve, reject) {
        
        failedQueue.push({resolve, reject})
      }).then(token => {
        originalRequest.headers['Authorization'] = token;
        return axios(originalRequest);
      }).catch(err => {
        return err
      })
    }

    originalRequest._retry = true;
    isRefreshing = true;
    
    return new Promise(function (resolve, reject) {
      apiService.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('UHZ')).status.refreshToken;
      apiService.get('/auth/refresh-token')
        .then(({data}) => {
            apiService.defaults.headers.common['Authorization'] = data.token;
            originalRequest.headers['Authorization'] = data.token;
            processQueue(null, data.token);
            resolve(apiService(originalRequest));
        })
        .catch((err) => {
            processQueue(err, null);
            reject(err);
        })
        .then(() => {
          alert('Can I refresh token');
          isRefreshing = false;
          store.dispatch('UPDATE_TOKEN', {
            token: data.token,
            refreshToken: data.refreshToken,
          });
        })
    })
  }
  return Promise.reject(error);
});

export default apiService