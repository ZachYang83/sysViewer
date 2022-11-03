import request from "utils/request.js"

export function get_popData(url){
    return request({
        url,
        method:'get',
    })
}

export function get_citysData(url){
    return request({
        url,
        method:'get',
    })
}
