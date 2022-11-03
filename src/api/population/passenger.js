import request from "utils/request.js"

export function get_passengerData(url){
    return request({
        url,
        method:'get',
    })
}


