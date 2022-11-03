import request from "utils/request.js"

export function get_fangjiaData(url){
    return request({
        url,
        method:'get',
    })
}


