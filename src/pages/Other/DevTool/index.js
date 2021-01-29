/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react'
import { Tabs, Input, Card, Row, Col, Select, Form, DatePicker, Tooltip, Button, Space, message } from 'antd'
import { SwapOutlined } from '@ant-design/icons'
import { timeFormater } from '../../../common/utils/util'

import moment from 'moment'

class DevTool extends Component {
  state = {
    persentUnix: 0,
    persentTime: '',
    inputTimestamp: 0,
    inputTime: moment.unix(0),
    selectTimestamp: '' ,
    inputUrl: '',
    encodingResult: '',
    inputRegex: '',
    inputTestStr: '',
  }
  componentDidMount = () => {
    this.updateDisplayValue()
  }
  // 更新数值显示页面需要显示的值
  updateDisplayValue = () => {
    let timestamp = Math.ceil(moment.now() / 1000)
    this.setState({persentUnix: timestamp})
    this.setState({persentTime: timeFormater(timestamp, 1)})
  }
  // 查询的时间戳改变
  onInputTimestmp = (e) => {
    const {value} = e.target
    if (parseInt(value) == value) {
      console.debug('time=', moment.unix(parseInt(value)))
      this.setState({inputTime: moment.unix(parseInt(value))})
      this.setState({inputTimestamp: parseInt(value)})
    }
  }
  // 日期选择框改变
  onDatePickerChange = (e) => {
    console.debug('e=', e)
    this.setState({selectTimestamp: e.unix()})
  }
  // 正则表达式测试
  onTestRegex = (testType) => {
    const {inputRegex, inputTestStr} = this.state
    if (inputRegex === '' || inputTestStr === '') {
      message.warn('正则或测试的字符串不能为空')
      return
    }
    if (testType === 'test') {
      let reg = new RegExp(inputRegex)
      message.info('结果=' + reg.test(inputTestStr), 5)
    }
    if (testType === 'split') {
      let reg = new RegExp(inputRegex)
      console.log('split result=', inputTestStr.split(reg))
      message.info('结果请查看控制台' , 5)
    }
    if (testType === 'match') {
      let reg = new RegExp(inputRegex)
      message.info('结果=' + inputTestStr.match(reg), 5)
    }
    if (testType === 'exec') {
      let reg = new RegExp(inputRegex)
      message.info('结果=' + reg.exec(inputTestStr), 5)
    }
  }

  render () {
    const { TabPane } = Tabs
    const { TextArea } = Input
    const { Option } = Select
    const { persentUnix, persentTime, selectTimestamp, inputTime, encodingResult, inputUrl } = this.state

    return (
      <Row>
        <Col style={{width:'35em'}}>
          <Card>
            <Form labelCol={{span:5}}>
              <Form.Item label='当前时间'>
                <Input value={persentTime}/>
              </Form.Item>
              <Form.Item label='当前时间戳'>
                <Input value={persentUnix} />
              </Form.Item>
            </Form>
            <Row>
              <Col span={11}>
                <Tooltip title='输入时间戳查看对应时间'>
                  <Input placeholder={selectTimestamp} defaultValue={0} onChange={(e) => this.onInputTimestmp(e)} />
                </Tooltip>
              </Col>
              <Col span={2} style={{textAlign:'center'}}><SwapOutlined /></Col>
              <Col span={11}>
                <DatePicker key={inputTime} format='YYYY-MM-DD HH:mm:ss' showTime
                  defaultValue={inputTime} onOk={(e, v) => {this.onDatePickerChange(e)}}/>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col style={{width:'35em', marginLeft:'1em'}}>
          <Card>
            <Row>
              <Col span={11}><TextArea autoSize={{minRows: 4}} placeholder='需要编码或解码的内容输入到这里' onChange={(e) => {this.setState({inputUrl: e.target.value})}}/></Col>
              <Col span={2} style={{textAlign:'center'}}>👉</Col>
              <Col span={11}><TextArea autoSize={{minRows: 4}} value={encodingResult} /></Col>
            </Row>
            <Row>
              <Col span={24} style={{textAlign:'center', marginTop:'5px'}}>
                <Space size='large' align='baseline'>
                  <Button onClick={() => {this.setState({encodingResult: encodeURI(inputUrl)})}}>URI编码</Button>
                  <Button onClick={() => {this.setState({encodingResult: decodeURI(inputUrl)})}}>URI解码</Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col style={{width:'35em', marginLeft:'1em'}}>
          <Card>
            <Row>
              <Col span={11}><TextArea autoSize={{minRows: 4}} placeholder='需要测试的正则表达式输入到这里'
                onChange={(e) => {this.setState({inputRegex: e.target.value})}}/>
              </Col>
              <Col span={2} style={{textAlign:'center'}}>🔧</Col>
              <Col span={11}><TextArea autoSize={{minRows: 4}} placeholder='需要测试的字符串输入到这里'
                onChange={(e) => {this.setState({inputTestStr: e.target.value})}}/>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{textAlign:'center', marginTop:'5px'}}>
                <Space size='large' align='baseline'>
                  <Button onClick={() => {this.onTestRegex('test')}}>test</Button>
                  <Button onClick={() => {this.onTestRegex('match')}}>match</Button>
                  <Button onClick={() => {this.onTestRegex('exec')}}>exec</Button>
                  <Button onClick={() => {this.onTestRegex('split')}}>split</Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default DevTool