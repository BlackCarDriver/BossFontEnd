import { bossAPI } from '../../../common/services/common'

export default {
  namespace: 'ipWhiteList',
  state: {
    displayList: []
  },

  reducers: {
    updateState (state, { payload }) {
      const { name, newValue } = payload
      return { ...state, [name]: newValue }
    }
  },

  effects: {
    * queryList ({ payload }, { select, call, put }) {
      let ipList = yield call(bossAPI, '/manage/ipWhiteList/list')
      if (!ipList) {
        return
      }
      for (let i = 0; i < ipList.length; i++) {
        ipList[i].key = i
      }
      yield put({
        type: 'updateState',
        payload: { name: 'displayList', newValue: ipList }
      })
    },
    * ipWhitelistOpe ({payload}, {select, call, put}) {
      const {opeType, ip, tag, callback} = payload
      console.debug('payload=', payload)
      let result = yield call(bossAPI, `/manage/ipWhiteList/ope?opeType=${opeType}&ip=${ip}&tag=${tag}`)
      console.debug('result=', result)
      if (result == null) {
        callback(false)
        return
      }
      callback(true)
    }
  }
}