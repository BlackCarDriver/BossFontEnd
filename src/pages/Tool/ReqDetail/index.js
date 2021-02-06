import React, { Component } from 'react'
import { connect } from 'dva'
import { List } from 'antd'

const namespace = 'reqDetail'

@connect(({ reqDetail }) => ({
  model: reqDetail
}))

class ReqDetail extends Component {
  state = {
    title: 'SUCCESS'
  }
  componentDidMount = () => {
    this.callModel('queryList')
    console.debug(navigator.plugins)
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
    const { reqMsg } = this.props.model
    let displayList = [
      {key:'ScreenSize', value: `${screen.width}×${screen.height}`},
      {key:'PlatForm', value: `${navigator.platform}`},
    ]
    displayList = displayList.concat(reqMsg)
    return (
      <div>
        <List itemLayout='horizontal' size='small' dataSource={displayList}
          renderItem={item =>
            <List.Item>
              <List.Item.Meta title={item.key} description={item.value} />
            </List.Item>
          }
        />
      </div>
    )
  }
}

export default ReqDetail