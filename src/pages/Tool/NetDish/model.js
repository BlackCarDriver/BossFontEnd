import { bossAPI } from '../../../common/services/common'

export default {
  namespace: 'netDish',
  state: {
    displayData: [],
    currentPage: 0,
    currentSize: 0,
  },

  reducers: {
    updateState (state, { payload }) {
      const { name, newValue } = payload
      return { ...state, [name]: newValue }
    }
  },

  effects: {
    * queryList ({ params }, { select, call, put }) {
      let infolist = yield call(bossAPI, '/tool/netdish/fileslist')
      if (!infolist) {
        return
      }
      for (let i = 0; i < infolist.length; i++) {
        infolist[i].key = i
      }
      yield put({
        type: 'updateState',
        payload: { name: 'displayData', newValue: infolist }
      })
    },
    * deleteFile ({payload}, {select, call, put}) {
      const { fileName, callback } = payload
      let res = yield call(bossAPI, '/tool/netdish/fileOpe?opeType=delete&fileName=' + fileName)
      if (res == null) {
        callback(false)
        return
      }
      callback(true)
    }
  }
}