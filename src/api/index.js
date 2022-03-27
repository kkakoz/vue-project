import axios from 'axios';
import {
    showMessage
} from "./status"; // 引入状态码文件
import {
    Toast
} from 'vant';
// 设置接口超时时间
axios.defaults.timeout = 60000;

// 请求地址，这里是动态赋值的的环境变量，下一篇会细讲，这里跳过
// @ts-ignore
axios.defaults.baseURL = "http://localhost:10015/api";
// import.meta.env.VITE_API_DOMAIN;

//http request 拦截器
axios.interceptors.request.use(
    config => {
        // 配置请求头
        config.headers = {
            //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
            'Content-Type': 'application/json;charset=UTF-8', // 传参方式json
            'token': '80c483d59ca86ad0393cf8a98416e2a1' // 这里自定义配置，这里传的是token
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // return response
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        // console.log("interce", response)
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        const {
            response
        } = error;
        console.log("err = ", err)
        if (response) {
            if (response.status == 200) {
                return Promise.resolve(response);
            }
            // // 请求已发出，但是不在2xx的范围
            // console.log("in if", response)
            // showMessage(response.status); // 传入响应码，匹配响应码对应信息
            // Toast(showMessage(response.status))
            // // Toast("网络连接异常,请稍后再试!", response);

        } else {
            console.log("in else", response)
            Toast("网络连接异常,请稍后再试!")
            // return Promise.reject(response.data);
            showMessage(response.status); // 传入响应码，匹配响应码对应信息
            Toast(showMessage(response.status))
            // Toast("网络连接异常,请稍后再试!", response);
            return Promise.reject(response);
        }
    }
);

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                console.log("post err", err)
                reject(err.data)
            })
    });
}