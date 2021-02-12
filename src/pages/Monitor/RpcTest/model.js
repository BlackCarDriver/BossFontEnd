import { bossAPI } from '../../../common/services/common'

export default {
  namespace: 'rpcTest', // 要改
  state: {
    testResult: '',
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
      let res = yield call(bossAPI, payload.url, payload)
      if (!res) {
        return
      }
      yield put({
        type: 'updateState',
        payload: { name: 'testResult', newValue: res }
      })
    }
  }
}