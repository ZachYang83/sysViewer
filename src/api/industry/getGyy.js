import request from "utils/request.js"

export function get_gyyData(url){
    return request({
        url,
        method:'get',
    })
}
