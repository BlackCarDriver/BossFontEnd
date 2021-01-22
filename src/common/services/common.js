import request from '../utils/request'
import { message } from 'antd'

export async function bossAPI (api) {
  const resp = await request('/bsapi' + api)
  const { data } = resp
  if (data == undefined) {
    message.warn('unexpect response, api=' + api, 5)
    return null
  }
  const { status, msg, payLoad } = data
  if (status !== 0) {
    message.warn('unexpect status: api=' + api + ' message=' + msg, 5)
    return null
  }
  // 一些正常响应没有payLoad，为了让返回值区别是否成功，这时用0代替null
  return payLoad == null ? 0 : payLoad
}
