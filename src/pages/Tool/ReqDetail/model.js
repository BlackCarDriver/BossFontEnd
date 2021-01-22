import { bossAPI } from '../../../common/services/common'

export default {
  namespace: 'reqDetail',
  state: {
    reqMsg: []
  },
  reducers: {
    updateState (state, { payload }) {
      const { name, newValue } = payload
      return { ...state, [name]: newValue }
    }
  },
  effects: {
    * queryList ({ params }, { select, call, put }) {
      let res = yield call(bossAPI, '/msg/reqDetail')
      if (!res) {
        return
      }
      yield put({
        type: 'updateState',
        payload: { name: 'reqMsg', newValue: res }
      })
    }
  }
}