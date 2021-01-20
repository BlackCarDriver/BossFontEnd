import React, { Component } from 'react'
import { connect } from 'dva'

const namespace = 'netDish'

@connect(({ netDish }) => ({
  model: netDish
}))

class NetDish extends Component {
  state = {
    title: 'SUCCESS'
  }
  componentDidMount = () => {
    console.debug('init success')
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
    const { route } = this.props
    console.debug('props2=', this.props)
    return (
      <h1>个人网盘</h1>
    )
  }
}

export default NetDish