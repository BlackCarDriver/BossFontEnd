import { bossAPI } from '../../../common/services/common'

export default {
  namespace: 'serverLog',
  state: {
    displayLog: []
  },

  reducers: {
    updateState (state, { payload }) {
      const { name, newValue } = payload
      return { ...state, [name]: newValue }
    }
  },

  effects: {
    * queryList ({ payload }, { select, call, put }) {
      console.debug('params=', payload)
      let res = yield call(bossAPI, `/monitor/getServerLog?target=${payload}`)
      if (!res) {
        return
      }
      yield put({
        type: 'updateState',
        payload: { name: 'displayLog', newValue: res }
      })
    }
  }
}