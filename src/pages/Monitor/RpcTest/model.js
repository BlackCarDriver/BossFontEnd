import { bossAPI } from '../../../common/services/common'

export default {
  namespace: 'rpcTest', // 要改
  state: {
    testResult: {stdErr:'', stdOut:''},
  },

  reducers: {
    updateState (state, { payload }) {
      const { name, newValue } = payload
      return { ...state, [name]: newValue }
    }
  },

  effects: {
    * sendTestReq ({ payload }, {select, call, put}) {
      console.debug('payload=', payload)
      const { value, callbackFunc } = payload
      let res = yield call(bossAPI, value.url, value, true)
      if (!res) {
        callbackFunc(false)
        return
      }
      callbackFunc(true)
      yield put({
        type: 'updateState',
        payload: { name: 'testResult', newValue: res }
      })
    }
  }
}