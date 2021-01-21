import request from '../utils/request'

export function query () {
  return request('/bsapi/msg/reqDetail')
}
