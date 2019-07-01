import Vue from 'vue'
import axios from 'axios'

// 创建axios实例
const axiosService = axios.create({
  timeout: 1000 * 30,
  // 允许跨域带token
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// request拦截器
axiosService.interceptors.request.use(
  config => {
    config.headers['token'] =
      Vue.store.state.user.user.token != ''
        ? Vue.store.state.user.user.token
        : '74c8ffe4a59da108f03aa7afc77cc24e'
    // if(config.url.indexOf("http://result.eolinker.com")) {
    //   config.headers['token'] = Vue.cookie.get('token') ? Vue.cookie.get('token') : '74c8ffe4a59da108f03aa7afc77cc24e';
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response拦截器
axiosService.interceptors.response.use(
  response => {
    if (response.data && response.data.code === 401) {
      // 401, token失效
      Vue.cookie.delete('token')
      Vue.router.push({ name: 'login' })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosService
