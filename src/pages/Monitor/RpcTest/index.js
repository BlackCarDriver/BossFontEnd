import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Button, Input, Space, Card, message, Typography, Spin } from 'antd'
import { goDemoCode, goDemoInput, cppDemoCode, cppDemoInput, cDemoCode, cDemoInput } from './demoCode'
import Modal from 'antd/lib/modal/Modal'

const namespace = 'rpcTest'
const codeRunnerUrl = '/monitor/rpc/test'

@connect(({ rpcTest }) => ({
  model: rpcTest
}))

class RpcTest extends Component {
  state = {
    modelVisable: false,
    waiting: false,
    target: { url:'', title: '', tag:'', str1:'', str2: '', str3:'', num1:'', num2:'', num3:''}
  }

  testDemo = [
    {title: 'Go编译测试', url: codeRunnerUrl, tag: 'codeRunner_buildGo', str1: goDemoCode, str2: goDemoInput},
    {title: 'C++编译测试', url: codeRunnerUrl, tag: 'codeRunner_buildCpp', str1: cppDemoCode, str2: cppDemoInput},
    {title: 'C编译测试', url: codeRunnerUrl, tag: 'codeRunner_buildC', str1: cDemoCode, str2: cDemoInput},
    {title: '程序执行测试', url: codeRunnerUrl, tag: 'codeRunner_run', str1: 'GO', str2: '9734d8b029', str3: goDemoInput },
  ]

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
  // 点击测试样例
  onClickTestDemo = (demo) => {
    this.setState({target: demo, modelTitle: demo.title, modelVisable: true})
    setTimeout(() => {
      this.formRef.setFieldsValue({...demo})
    }, 500)
  }
  // 点击模态框的确认按钮
  onComfirmTest = () => {
    this.formRef.submit()
  }
  // 表单提交:调用model发送测试请求
  sendTestReq = (value) => {
    console.debug('value=', value)
    this.setState({waiting: true})
    this.callModel('sendTestReq', {
      value: value,
      callbackFunc: (success) => {
        if (success){
          message.success('test pass')
          this.setState({modelVisable: false, waiting: false})
        }else{
          message.error('test failed')
          this.setState({waiting: false})
        }
      }
    })
  }

  render () {
    const { modelVisable, target, modelTitle, waiting } = this.state
    const { testResult } = this.props.model
    const { Text, Paragraph } = Typography
    const { TextArea } = Input

    return (
      <div>
        <Space direction='vertical'>
          {this.testDemo.map((item, index) => {
            return <Button key={index} type='link' onClick={() => {this.onClickTestDemo(item)}}>
              {item.title}
            </Button>})
          }
          <Card title='测试结果' hidden={testResult == {}} size='small'>
            <Paragraph>
              <Text code hidden={testResult.stdErr == ''}>stdErr</Text><br />
              <TextArea style={{width:'40em', margin:'5px 0'}} value={testResult.stdErr} hidden={testResult.stdErr == ''} rows={4} />
              <Text code hidden={testResult.stdOut == ''}>stdOut</Text><br />
              <TextArea style={{width:'40em', margin:'5px 0'}} value={testResult.stdOut} hidden={testResult.stdOut == ''} rows={4} />
            </Paragraph>
          </Card>
        </Space>

        <Modal visible={modelVisable}
          onCancel={() => this.setState({modelVisable: false})}
          onOk={() => {this.onComfirmTest()}}
          okText='测试' cancelText='取消' title={modelTitle}
        >
          <Spin spinning={waiting}>
            <Form onFinish={(v, v2) => this.sendTestReq(v, v2)}
              initialValues={{str1:'', str2:'', str3:'', num1:0, num2:0, num3:0}}
              ref={form => { this.formRef = form }}
              style={{width: '100%'}}
              labelCol={{span: 3}}
            >
              <Form.Item label='Url' name='url'>
                <Input disabled/>
              </Form.Item>
              <Form.Item label='Tag' name='tag'>
                <Input disabled/>
              </Form.Item>
              <Form.Item label='Str1' name='str1' hidden={target.str1 == null}>
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item label='Str2' name='str2' hidden={target.str2 == null}>
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item label='Str3' name='str3' hidden={target.str3 == null}>
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item label='Num1' name='num1' hidden={target.num1 == null}>
                <Input />
              </Form.Item>
              <Form.Item label='Num2' name='num2' hidden={target.num2 == null}>
                <Input />
              </Form.Item>
              <Form.Item label='Num3' name='num3' hidden={target.num3 == null}>
                <Input />
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      </div>
    )
  }
}

export default RpcTest // 要改