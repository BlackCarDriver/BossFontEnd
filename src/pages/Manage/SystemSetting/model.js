import { bossAPI } from '../../../common/services/common'

export default {
  namespace: 'systemSetting',
  state: {
    settingStatus: {
      callDriverEmail: false,
      alertEmail: false
    }
  },

  reducers: {
    updateState (state, { payload }) {
      const { name, newValue } = payload
      return { ...state, [name]: newValue }
    }
  },

  effects: {
    * getStatus ({ payload }, { select, call, put }) {
      let result = yield call(bossAPI, '/manage/systemSetting/status')
      if (result == null) {
        return
      }
      yield put({
        type: 'updateState',
        payload: { name: 'settingStatus', newValue: result }
      })
    },
    * sendReauire ({ payload }, { select, call, put }) {
      const {tag, params, callbackFunc } = payload
      let result = yield call(bossAPI, `/manage/systemSetting/ope?tag=${tag}&params=${params}`)
      if (result == null) {
        callbackFunc(false)
        return
      }
      callbackFunc(true)
    }
  }
}