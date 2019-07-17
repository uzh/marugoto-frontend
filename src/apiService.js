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
  store.dispatch('ERROR_NETWORK_CONNECTION', {
    status: false,
    message: '',
  });
  return response;
}, function (error) {
  /**
   * SERVER ERROR
   */
  if( error.message == 'Network Error' ) {
    store.dispatch('ERROR_NETWORK_CONNECTION', {
      status: true,
      message: error.response.data.message, //"Ops we can't reach server right now. Please try again later.",
    });
    return;
  }

  /**
   * DATABASE ERROR
   */
  if( error.response.status === 500 && error.response.data.exception == 'ArangoDBException'){
    store.dispatch('ERROR_NETWORK_CONNECTION', {
      status: true,
      message: error.response.data.message, //'Database not reachable, please try again later!',
    });
    return;
  }

  /**
   * GAMESTATE BROKEN
   */
  if( error.response.data.exception == 'GameStateBrokenException'){
    store.dispatch('LOGOUT');
    return;
  }

  /**
   * INVITATION LINK EXPIRED
   */
  if( error.response.status === 400 && error.response.data.exception == 'ClassroomLinkExpiredException'){
    store.dispatch('CLEAR_INVITATION_LINK');
    store.dispatch('INVITATION_EXPIRED', error.response.data.message);
    return;
  }

  /**
   * INVITATION LINK NOT POSSIBLE
   */
  if( error.response.status === 400 && error.response.data.exception == 'ClassroomNotWithSameUser'){
    store.dispatch('CLEAR_INVITATION_LINK');
    store.dispatch('INVITATION_EXPIRED', error.response.data.message);
    return;
  }

  /**
   * AUTH ERROR
   */
  
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    if( error.config.url == `${API_URL}auth/refresh-token` ){
      failedQueue = [];
      store.dispatch('LOGOUT');
      return;
    }
    if (isRefreshing) {
      return new Promise(function(resolve, reject) {
        failedQueue.push({resolve, reject})
      }).then(token => {
        originalRequest.headers['Authorization'] = token;
        return apiService(originalRequest);
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
          isRefreshing = false;
        })
    })
  }
  return Promise.reject(error);
});

export default apiService