import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Input, Row, Col, Button, Typography, Tag, BackTop} from 'antd'

const namespace = 'serverLog'

@connect(({ serverLog }) => ({
  model: serverLog
}))

class ServerLog extends Component {
  state = {
    target: ''
  }
  componentDidMount = () => {
    this.callModel('queryList', 'boss')
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

  createText = (logs) => {
    if(Array.isArray(logs)){
      return logs.map((row,i) => {return <p key={i}>{row}</p>})
    }else{
      console.debug('is not Array ')
      return logs
    }
  }

  render () {
    const { displayLog } = this.props.model
    const { Paragraph } = Typography
    const topUpStyle = {
      height: 40,
      width: 40,
      lineHeight: '40px',
      borderRadius: 4,
      backgroundColor: '#1088e9',
      color: '#fff',
      textAlign: 'center',
      fontSize: 14,
    }
    return (
      <dvi>
        <Row style={{marginBottom: '1em'}}>
          <Col>
            <Input onChange={(v) => {this.setState({target:v.target.value})}}/>
          </Col>
          <Col style={{marginLeft:'1em'}}>
            <Button onClick={() => {this.callModel('queryList', this.state.target)}}>搜索</Button>
          </Col>
        </Row>
        <Tag color='lime'>结果行数：{displayLog.length}</Tag>
        <Card style={{width:'100%', lineHeight:'0.9em'}}>
          <Paragraph>
            { this.createText(displayLog) }
          </Paragraph>
          <BackTop>
            <div style={topUpStyle}>UP</div>
          </BackTop>
        </Card>
      </dvi>
    )
  }
}

export default ServerLog