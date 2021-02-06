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
      // const list = [
      //   {name:'codeRunner',
      //     'counter':123123,
      //     'members':[
      //       {tag:'localhost1',url:'127.0.0.1:83',status:-99,counter:1,regTime:1612616193,lastTime:0, failed: 1},
      //       {tag:'localhost1',url:'127.0.0.1:83',status:-99,counter:123424,regTime:1612616193,lastTime:0, failed: 12},
      //       {tag:'localhost1',url:'127.0.0.1:83',status:-99,counter:23423,regTime:1612616193,lastTime:0, failed: 1},
      //       {tag:'localhost1',url:'127.0.0.1:83',status:-99,counter:22,regTime:1612616193,lastTime:0, failed: 1},
      //       {tag:'localhost1',url:'127.0.0.1:83',status:-99,counter:3,regTime:1612616193,lastTime:0, failed: 1},
      //       {tag:'localhost1',url:'127.0.0.1:83',status:-99,counter:234,regTime:1612616193,lastTime:0, failed: 1},
      //     ]},
      //   {name:'codeRunner2',
      //     'counter':2222,
      //     'members':[
      //       {tag:'localhost1',url:'127.0.0.1:83',status:-123,counter:0,regTime:1612616193,lastTime:0},
      //       {tag:'localhost1',url:'127.0.0.1:83',status:0,counter:0,regTime:1612616193,lastTime:0},
      //       {tag:'localhost1',url:'127.0.0.1:83',status:0,counter:0,regTime:1612616193,lastTime:0},
      //     ]}
      // ]
      let res = yield call(bossAPI, '/monitor/rpcOverview')
      if (!res) {
        return
      }
      yield put({
        type: 'updateState',
        payload: { name: 'displayList', newValue: res }
      })
    }
  }
}