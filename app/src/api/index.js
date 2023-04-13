import axios from 'axios';

let instance = axios.create({
  baseURL: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:2530' : 'https://api.vertsis.com.br',
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = (JSON.parse(localStorage.getItem('user')) || {}).auth;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data || response.data == false ? response.data : response;
  },
  (err) => {

    if (err.response && err.response.status == 401) window.location.href = '/logout';

    return Promise.reject(

      err.response && err.response.data ?
        `${err.response.status} - ${err.response.data}` :
        err.message ?
          err.message : JSON.stringify(err));
  }
);

export default instance;
