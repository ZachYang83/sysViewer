import request from "utils/request.js"

export function get_cargoData(url){
    return request({
        url,
        method:'get',
    })
}


