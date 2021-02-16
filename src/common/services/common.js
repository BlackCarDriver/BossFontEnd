import request from '../utils/request'
import { message } from 'antd'
import fetch from 'dva/fetch'

export async function bossAPI (api, params = null, post = false) {
  let url = '/bsapi' + api
  if (!post && params) {
    url += '?' + urlEncode(params)
  }
  const resp = await request(url, {
    method: post ? 'post' : 'get',
    body: post ? JSON.stringify({...params}) : null,
    headers:new Headers({
      'Content-Type': 'application/json;charset=UTF-8'
    })
  })
  console.debug(resp)
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
  // 一些正常响应没有payLoad，为了让返回值区别是否成功，这时用1代替null
  return payLoad == null ? 1 : payLoad
}

let urlEncode = function (param, key, encode) {
  if(param == null) return ''
  var paramStr = ''
  var t = typeof param
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + (encode == null || encode ? encodeURIComponent(param) : param)
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}

// ----------------- below code is copy -----------------

function parseJSON (response) {
  return response.json()
}

function checkStatus (response, jsonp) {
  if (jsonp && response.ok) {
    return response
  }
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function bossAPI2 (url, { jsonp, ...options } = {}) {
  return fetch(url, {
    credentials: 'include',
    ...options
  })
    .then(res => checkStatus(res, jsonp))
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }))
}
