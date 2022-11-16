import request from "utils/request.js"

export function getChangzhu(url,params){
    return request({
        url,
        method:'get',
        params,
    })
}



