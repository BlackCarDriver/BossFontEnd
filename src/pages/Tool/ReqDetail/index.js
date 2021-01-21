import React, { Component } from 'react'
import { connect } from 'dva'

const namespace = 'reqDetail'

@connect(({ reqDetail }) => ({
  model: reqDetail
}))

class ReqDetail extends Component {
  state = {
    title: 'SUCCESS'
  }
  componentDidMount = () => {
    console.debug('props3', this.props)
    this.callModel('queryList')
  }

  // 调用 model 处理函数
  callModel = (funcName, params) => {
    const { dispatch } = this.props
    dispatch({
      type: `${namespace}/${funcName}`,
      payload: params
    })
  }
  // 修改单个model state 成员
  changeState = (name, newValue) => {
    this.callModel('updateState', {
      name: name, newValue: newValue
    })
  }

  render () {
    console.debug('props=', this.props)
    return (
      <div>
        <h1>请求信息</h1>
        {/* <code>{reqMsg}</code> */}
      </div>
    )
  }
}

export default ReqDetail