import axios, { AxiosResponse } from 'axios'
import type { RootObject } from './SearchData'

const request = axios.create({
    baseURL: 'https://wallhaven.cc/api/v1/',
    timeout: 6000
})

// 异常拦截处理器
const errorHandler = (error: any) => {
    if (error.response) {
        if (error.response.status === 429) {
            //TODO
        }
        if (error.response.status === 401) {
            //TODO
        }
    }
    return Promise.reject(error)
}

request.interceptors.request.use(config => {
    // ...
    return config
}, errorHandler)

request.interceptors.response.use((response) => {
    console.log('response: ', response)
    return response.data
}, errorHandler)

function getWallpaperInfo(id: string) {
    return request.get(`w/${id}`)
}

async function searchWallpaper(parameter = {}): Promise<RootObject> {
    let str = ''
    for (let key in parameter) {
        str = str + `${key}=${parameter[key]}&`
    }
    if (str.length > 0) {
        str = '?' + str.substring(0, str.length - 1)
    }
    console.log(str)
    return request.get(`search${str}`)
}

export {
    getWallpaperInfo,
    searchWallpaper
}