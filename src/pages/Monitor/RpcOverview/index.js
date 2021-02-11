import React, { Component } from 'react'
import { connect } from 'dva'
import { Divider, Card, Row, Col, Tag, Space, Button, Empty, Menu, Dropdown, Popconfirm, message} from 'antd'
import { timeFormater } from '../../../common/utils/util'
import { DownOutlined } from '@ant-design/icons'

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

  getStatusText = (statusCode) => {
    switch (statusCode) {
    case 0:
      return '正常'
    case 2:
      return '维护中'
    case -1:
      return '已下线'
    case -9:
      return '异常'
    default:
      return 'unknow (' + statusCode + ')'
    }
  }
  getStatusColor = (statusCode) => {
    switch (statusCode) {
    case 0:
      return ''
    case 2:
      return 'blue'
    case -1:
      return 'yellow'
    case -9:
      return 'red'
    default:
      return 'red'
    }
  }
  getPercentColor = (percent) => {
    if (percent > 99.5) {
      return 'green'
    }
    if (percent > 90) {
      return 'blue'
    }
    return 'red'
  }
  // 节点控制
  nodeOpe = (s2sName, addr, ope) => {
    let CBFunc = (ok) => {
      console.debug('ok=', ok)
      if (ok) {
        message.success('操作成功')
        this.callModel('queryList')
      }else{
        message.warn('操作失败')
      }
    }
    this.callModel('s2sNodeOpe', {
      params: {
        s2sName: s2sName,
        addr: addr,
        ope: ope,
      },
      CBFunc: CBFunc,
    })
  }

  getExtraCardHtml = (s2sName, addr, status) => {
    const statusText = this.getStatusText(status)
    const menu =
      <Menu>
        <Menu.Item disabled={statusText != '正常'}>
          <Popconfirm title='确定暂停此节点?' onConfirm={() => this.nodeOpe(s2sName, addr, 'hang')} okText='Yes' cancelText='No' >
            <a href='#'>暂停服务</a>
          </Popconfirm>
        </Menu.Item>
        <Menu.Item disabled={statusText != '维护中'}>
          <Popconfirm title='确定恢复工作?' onConfirm={() => this.nodeOpe(s2sName, addr, 'restore')} okText='Yes' cancelText='No' >
            <a href='#'>恢复工作</a>
          </Popconfirm>
        </Menu.Item>
        <Menu.Item disabled={statusText == '正常'}>
          <Popconfirm title='确定删除此节点?' onConfirm={() => this.nodeOpe(s2sName, addr, 'remove')} okText='Yes' cancelText='No' >
            <a href='#'>删除节点</a>
          </Popconfirm>
        </Menu.Item>
      </Menu>

    return (
      <Dropdown overlay={menu}>
        <a onClick={e => e.preventDefault()}>
        操作<DownOutlined />
        </a>
      </Dropdown>
    )
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
              let percent = item.counter == 0 ? 100 : (100 - item.failed / item.counter * 100).toFixed(2)
              return (
                <Col key={index} style={{width:'300px', marginRight: '1em', marginBottom: '1em'}}>
                  <Card size='small' title={item.tag}
                    style={{ width: '100%'}}
                    extra={this.getExtraCardHtml(overView.name, item.url, item.status)}>
                    <Space direction='vertical'>
                      <Row><Tag>备注</Tag>: {item.tag}</Row>
                      <Row><Tag>地址</Tag>: {item.url}</Row>
                      <Row><Tag color={this.getStatusColor(item.status)}>状态</Tag>: {this.getStatusText(item.status)}</Row>
                      <Row><Tag>调用次数</Tag>: {item.counter}</Row>
                      <Row><Tag>失败次数</Tag>: {item.failed}</Row>
                      <Row><Tag color={this.getPercentColor(percent)}>成功率</Tag>: {percent}%</Row>
                      <Row><Tag>注册时间</Tag>: {timeFormater(item.regTime)}</Row>
                      <Row><Tag>上次调用</Tag>: {item.lastTime == 0 ? '未调用' : timeFormater(item.lastTime, 6)}</Row>
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
        {displayList.length == 0 ? <Empty /> : ''}
        {displayList.map((value, index) => {
          return this.genOverviewHtml(value)
        })}
      </div>
    )
  }
}

export default RpcOverview