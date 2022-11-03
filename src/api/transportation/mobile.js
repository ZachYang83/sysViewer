import request from "utils/request.js"

export function get_mobileData(url){
    return request({
        url,
        method:'get',
    })
}


