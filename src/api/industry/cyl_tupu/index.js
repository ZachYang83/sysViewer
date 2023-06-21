import request from "utils/request.js"

export function getCompany(url,params){
    return request({
        url,
        method:'get',
        params,
    })
}



