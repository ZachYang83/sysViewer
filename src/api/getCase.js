import request from '@/utils/request'

export function getCase(params) {
    return request({
      url: 'case/type',
      method: 'post',
      params
    })
  }