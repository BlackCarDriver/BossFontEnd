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
      yield put({
        type: 'updateState',
        payload: { name: 'displayList', newValue: [] }
      })
    }
  }
}