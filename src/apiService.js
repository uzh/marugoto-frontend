import axios from 'axios'
import store from './store'

const API_URL = process.env.VUE_APP_API_PATH;

const apiService = axios.create({
  baseURL: API_URL,
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
  store.dispatch('ERROR_NETWORK_CONNECTION', false);
  return response;
}, function (error) {
  /**
   * SERVER ERROR
   */
  if (!error.status) {
    store.dispatch('ERROR_NETWORK_CONNECTION', true);
    return;
  }
  /**
   * AUTH ERROR
   */
  // console.log(error.config)
  const originalRequest = error.config;
  // console.log('1. API error');
  if (error.response.status === 401 && !originalRequest._retry) {
    if( error.config.url == 'http://localhost:8080/api/auth/refresh-token' ){
      // console.log('------------- REFRESH 401 -------------')
      failedQueue = [];
      store.dispatch('LOGOUT');
      return;
    }
    // console.log('2. AUTH error');
    if (isRefreshing) {
      // console.log('---------------------------------------------');
      // console.log('WARN - token refreshing - put promise to que');
      return new Promise(function(resolve, reject) {
        failedQueue.push({resolve, reject})
        // console.log(failedQueue);
        // console.log('---------------------------------------------');
      }).then(token => {
        // console.log('RESOLVE que calls');
        originalRequest.headers['Authorization'] = token;
        return apiService(originalRequest);
      }).catch(err => {
        return err
      })
    }

    // console.log('SET REFRESHING TO TRUE')
    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise(function (resolve, reject) {
      // console.log('3. PUT refreshToken in header');
      apiService.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('UHZ')).status.refreshToken;
      apiService.get('/auth/refresh-token')
        .then(({data}) => {
          // console.log('4. assign new tokens');
          apiService.defaults.headers.common['Authorization'] = data.token;
          originalRequest.headers['Authorization'] = data.token;
          // console.log('5. STORE UPDATE TOKEN');
          store.dispatch('UPDATE_TOKEN', {
            token: data.token,
            refreshToken: data.refreshToken,
          });
          processQueue(null, data.token);
          resolve(apiService(originalRequest));
        })
        .catch((err) => {
            processQueue(err, null);
            reject(err);
        })
        .then(() => {
          // console.log('SET REFrEShiNG TO FALSE');
          isRefreshing = false;
        })
    })
  }
  return Promise.reject(error);
});

export default apiService