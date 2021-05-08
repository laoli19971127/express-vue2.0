//拦截文件

import axios from 'axios';
import router from '../router'
//创建一个实例
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    //请求延时为3000毫秒
    timeout: 3000,
})

//拦截器 请求拦截
instance.interceptors.request.use(config => {
    console.log(config)
    // config.headers = {
    //     'Content-Type': 'application/json'
    // }
    if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization');
      }
    return config;
}, err => {
    return Promise.reject(err);
});

//拦截器 响应拦截
instance.interceptors.response.use(res => {
    return res.data;
    console.log(res)
}, err => {
    console.log(err.response)
    const code = err.response.status;
    if(code==401){
        router.push({name: 'Login'})
    }
    return Promise.reject(err);
});

//整体导出
export default instance;