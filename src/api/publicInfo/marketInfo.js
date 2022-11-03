import request from "utils/request.js"

export function get_markData(url){
    return request({
        url,
        method:'get',
    })
}
