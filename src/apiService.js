/* eslint-disable */
import axios from 'axios'
import store from './store'

const API_URL = process.env.VUE_APP_API_PATH || 'http://localhost:8080/api'

const apiService = axios.create({
  baseURL: API_URL,
  params: {} // do not remove this, its added to add params later in the config
});

apiService.interceptors.response.use(function (response) {
  // Do something with response data
  console.log('GO trough token ok');
  return response;
}, function (error) {
  // Do something with response error
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    console.log('Renew token');
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
      apiService.get('/auth/generate-token')
        .then(({data}) => {
            store.dispatch('UPDATE_TOKEN', {
              token: data.token,
              refreshToken: data.refreshToken,
            });

            apiService.defaults.headers.common['Authorization'] = data.token;
            originalRequest.headers['Authorization'] = data.token;
            processQueue(null, data.token);
            resolve(axios(originalRequest));
        })
        .catch((err) => {
            processQueue(err, null);
            reject(err);
        })
        .then(() => { isRefreshing = false })
    })
  }
  return Promise.reject(error);
});

export default apiService