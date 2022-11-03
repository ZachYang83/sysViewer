import request from "utils/request.js"

export function get_ershoufangData(url){
    return request({
        url,
        method:'get',
    })
}


