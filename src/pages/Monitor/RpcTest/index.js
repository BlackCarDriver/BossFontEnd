import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Button, Input, Row, Space, modelTitle } from 'antd'
import Modal from 'antd/lib/modal/Modal'

const namespace = 'rpcTest'
const codeRunnerUrl = '/monitor/rpc/test'

@connect(({ rpcTest }) => ({
  model: rpcTest
}))

class RpcTest extends Component {
  state = {
    modelVisable: false,
    target: { url:'', title: '', tag:'', str1:'', str2: '', str3:'', num1:'', num2:'', num3:''}
  }

  testDemo = [
    {title: 'C++编译测试', url: codeRunnerUrl, tag: 'codeRunner_buildCpp', str1: '...', num1: '22'},
    {title: 'Go编译测试', url: codeRunnerUrl, tag: 'codeRunner_buildGo', str2: '..sss.', num3: '223'},
    {title: '程序执行测试', url: codeRunnerUrl, tag: 'codeRunner_run', str3: '...', num2: '22'},
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
    console.debug(value)
    this.callModel('sendTestReq', value)
  }

  render () {
    const { modelVisable, target, modelTitle } = this.state
    const { TextArea } = Input
    console.debug('target=', target)
    return (
      <div>
        <Space direction='vertical'>
          {this.testDemo.map((item, index) => {
            return <Button key={index} type='link' onClick={() => {this.onClickTestDemo(item)}}>
              {item.title}
            </Button>})
          }
        </Space>

        <Modal visible={modelVisable}
          onCancel={() => this.setState({modelVisable: false})}
          onOk={() => {this.onComfirmTest()}}
          okText='测试' cancelText='取消' title={modelTitle}
        >
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
        </Modal>
      </div>
    )
  }
}

export default RpcTest // 要改