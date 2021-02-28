import { bossAPI } from '../../../common/services/common'

export default {
  namespace: 'rpcOverview',
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
    * queryList ({ params }, { select, call, put }) {
      // const res = [
      //   {name:'docker',
      //     'counter':123123,
      //     'members':[
      //       {tag:'win10',url:'127.0.0.1:83',status:0,counter:3,regTime:1612616193,lastTime:1612616193, failed: 1},
      //       {tag:'linux',url:'127.0.0.1:83',status:2,counter:123424,regTime:1612616193,lastTime:1612616193, failed: 12},
      //     ]},
      //   {name:'killer',
      //     'counter':2222,
      //     'members':[
      //       {tag:'pcwind..',url:'127.0.0.1:83',status:-1,counter:999,regTime:1612616193,lastTime:1613006723, failed: 1},
      //       {tag:'localhost',url:'127.0.0.1:83',status:-9,counter:87,regTime:1612616193,lastTime:1612616193, failed: 1},
      //       {tag:'localhost',url:'127.0.0.1:83',status:-123,counter:6456456,regTime:1612616193,lastTime:1613006523, failed: 1},
      //     ]}
      // ]
      let res = yield call(bossAPI, '/monitor/rpc/overview')
      if (!res) {
        return
      }
      yield put({
        type: 'updateState',
        payload: { name: 'displayList', newValue: res }
      })
    },
    *s2sNodeOpe ({ payload }, { select, call, put }) {
      const { params, CBFunc } = payload
      console.debug('CBFunc=',CBFunc)
      let res = yield call(bossAPI, '/monitor/rpc/ope', params)
      if (!res) {
        CBFunc(false)
        return
      }
      CBFunc(true)
    }
  }
}