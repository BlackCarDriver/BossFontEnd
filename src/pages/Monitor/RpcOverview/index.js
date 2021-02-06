import React, { Component } from 'react'
import { connect } from 'dva'
import { Divider, Card, Row, Col, Tag, Space, Button } from 'antd'
import { timeFormater } from '../../../common/utils/util'

const namespace = 'rpcOverview'

@connect(({ rpcOverview }) => ({
  model: rpcOverview
}))

class RpcOverview extends Component {
  state = {
    title: 'SUCCESS'
  }
  componentDidMount = () => {
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

  // 格式化状态
  getStatusText = (statusCode) => {
    switch (statusCode) {
    case -99:
      return '异常'
    case 99:
      return '灰度'
    case 0:
      return '正常'
    default:
      return statusCode + '?'
    }
  }

  // 生成RPC服务状况概述
  genOverviewHtml = (overView) => {
    console.debug(overView)
    return(
      <div>
        <Divider orientation='left' plain>
          {`${overView.name} (${overView.counter})`}
        </Divider>
        <Row>
          {
            overView.members.map((item, index) => {
              let percent = (100 - item.failed / item.counter * 100).toFixed(2)
              return (
                <Col key={index} style={{width:'300px', marginRight: '1em', marginBottom: '1em'}}>
                  <Card style={{ width: '100%'}}>
                    <Space direction='vertical'>
                      <Row><Tag>备注</Tag>: {item.tag}</Row>
                      <Row><Tag>地址</Tag>: {item.url}</Row>
                      <Row><Tag color={item.status < 0 ? 'red' : item.status == 0 ? '' : 'blue'}>状态</Tag>: {this.getStatusText(item.status)}</Row>
                      <Row><Tag>调用次数</Tag>: {item.counter}</Row>
                      <Row><Tag>失败次数</Tag>: {item.failed}</Row>
                      <Row><Tag color={percent == 100 ? 'green' : percent < 90 ? 'red' : ''}>成功率</Tag>: %{percent}</Row>
                      <Row><Tag>注册时间</Tag>: {timeFormater(item.regTime)}</Row>
                      <Row><Tag>上次调通时间</Tag>: {timeFormater(item.lastTime)}</Row>
                    </Space>
                  </Card>
                </Col>
              )
            })
          }
        </Row>

      </div>
    )
  }
  render () {
    const { displayList } = this.props.model

    return (
      <div>
        <Button type='primary' onClick={() => this.callModel('queryList')}>刷新</Button>
        {displayList.map((value, index) => {
          return this.genOverviewHtml(value)
        })}
      </div>
    )
  }
}

export default RpcOverview