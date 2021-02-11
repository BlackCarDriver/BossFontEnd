import { bossAPI } from '../../../common/services/common'
import { timeFormater } from '../../../common/utils/util'
export default {
  namespace: 'serverBurden',
  state: {
    statType:'short',
    keepRefresh: true,
    sysStatInfo: [],
    realTimeStat: {
      cpuPercent: 0,
      vmUsedPercent: 0,
      avgLoad: 0,
      dishPercent: 0,
    }
  },

  reducers: {
    updateState (state, { payload }) {
      const { name, newValue } = payload
      return { ...state, [name]: newValue }
    }
  },

  effects: {
    * queryList ({ params }, { select, call, put }) {
      const { serverBurden } = yield select(state => state)
      const { statType } = serverBurden
      let res = yield call(bossAPI, `/monitor/sysStateInfo?type=${statType}`)
      if (!res) {
        yield put({
          type: 'updateState',
          payload: { name: 'keepRefresh', newValue: false }
        })
        return
      }
      for (let i = 0; i < res.length; i++){
        res[i].key = i,
        res[i].time = timeFormater(res[i].t, 5)
      }
      yield put({
        type: 'updateState',
        payload: { name: 'sysStatInfo', newValue: res }
      })
      let realtime = {...res[res.length - 1]}
      realtime.c = parseFloat((realtime.c / 100).toFixed(2))
      realtime.v = parseFloat((realtime.v / 100).toFixed(2))
      realtime.d = parseFloat((realtime.d / 100).toFixed(2))
      realtime.a = parseFloat(realtime.a.toFixed(2))
      yield put({
        type: 'updateState',
        payload: { name: 'realTimeStat', newValue: realtime }
      })
    }
  }
}