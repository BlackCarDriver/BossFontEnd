import { query } from '../../../common/services/example'

export default {
  namespace: 'reqDetail',
  state: {
    reqMsg: 'sss'
  },

  reducers: {
    updateState (state, { payload }) {
      const { name, newValue } = payload
      return { ...state, [name]: newValue }
    }
  },

  effects: {
    * queryList ({ params }, { select, call, put }) {
      let res = yield query()
      console.debug('res=', res)
    }

  }
}