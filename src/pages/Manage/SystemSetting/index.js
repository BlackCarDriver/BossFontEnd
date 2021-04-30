import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Switch, Divider, Row, Col, Button, message } from 'antd'

const namespace = 'systemSetting'

@connect(({ systemSetting }) => ({
  model: systemSetting
}))

class SystemSetting extends Component {
  state = {
    title: 'setting'
  }
  componentDidMount = () => {
    this.callModel('getStatus')
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
  // 请求更新和重启系统
  onRestartBtnClick = () => {
    let callbackFunc = (success) => {
      if (success) {
        message.success('请求成功')
      }else{
        message.error('请求失败')
      }
    }
    this.callModel('sendReauire', {tag:'systemUpdate', params: '', callbackFunc: callbackFunc})
  }
  // 请求更新配置参数
  onSwitchCallDriverEmail = (v, tag) => {
    let callbackFunc = (success) => {
      if (success) {
        message.success('请求成功')
      }else{
        message.error('请求失败')
      }
      this.callModel('getStatus')
    }
    this.callModel('sendReauire', {tag: tag, params: v, callbackFunc: callbackFunc})
  }
  render () {
    const {settingStatus} = this.props.model

    return (
      <Card>
        <Row>
          <Col span={6}>接收CallDriver通知</Col>
          <Col><Switch onChange={(v) => this.onSwitchCallDriverEmail(v, 'callDriverEmail')} checkedChildren='是' unCheckedChildren='否' checked={settingStatus.callDriverEmail}/></Col>
        </Row>
        <Divider />
        <Row>
          <Col span={6}>接收告警通知</Col>
          <Col><Switch onChange={(v) => this.onSwitchCallDriverEmail(v, 'alertEmail')} checkedChildren='是' unCheckedChildren='否' checked={settingStatus.alertEmail}/></Col>
        </Row>
        <Divider />
        <Row>
          <Col span={6}>重启系统</Col>
          <Col><Button type='primary' danger size='small' onClick={() => this.onRestartBtnClick()}>重启</Button></Col>
        </Row>
      </Card>
    )
  }
}

export default SystemSetting // 要改