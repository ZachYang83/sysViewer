import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// import qs from qs
const service = axios.create({
    baseURL: 'http://8.134.70.156:8090/', // url = base url + request url
    // baseURL: 'http://localhost:8090/',
    // timeout: 10000 // request timeout,
    // baseURL: process.env.VUE_APP_API_URL,
})

service.interceptors.request.use(
    config => {
      console.log(config,'config');
      return config
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
      if (response.status === 200) {            
        return Promise.resolve(response);        
      } else {            
        return Promise.reject(response);        
      } 
    },
    error => {
      console.log('err' + error) 
      Message({
        message: error.message,
        type: 'error',
        duration: 10 * 1000
      })
      return Promise.reject(error)
    }
  )

  export default service