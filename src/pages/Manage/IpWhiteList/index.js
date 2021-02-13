/* eslint-disable quotes */
import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Row, Col, Modal, Tooltip, Popconfirm, Form, Button, Input, message} from 'antd'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { trySeveralTimes } from '../../../common/utils/util'

const namespace = 'ipWhiteList'

@connect(({ ipWhiteList }) => ({
  model: ipWhiteList
}))

class IpWhiteList extends Component {
  state = {
    modelvisible: false,
    selectItem: {ip:'', tag:''},
  }
  componentDidMount = () => {
    this.refreshTagInfoList()
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
  // 获取列表数据
  refreshTagInfoList = () => {
    this.callModel('queryList')
  }
  // 删除标记
  onComfirmDelTag = (reocrd) => {
    let callbackFunc = (success) => {
      if (success){
        message.success('删除成功')
        this.refreshTagInfoList()
      }else{
        message.error('删除失败')
      }
    }
    this.callModel('ipWhitelistOpe', {...reocrd, opeType: 'delete', callback: callbackFunc})
  }
  // 更新或新增标记
  onComfirmUpdateTag = (record) => {
    let callbackFunc = (success) => {
      if (success){
        message.success('更新成功')
        this.setState({modelvisible: false })
        this.refreshTagInfoList()
      }else{
        message.error('更新失败')
      }
    }
    this.callModel('ipWhitelistOpe', {...record, opeType: 'update', callback: callbackFunc})
  }
  // 显示设置标记模态框
  onShowModel = (record) => {
    this.setState({modelvisible:true, selectItem: record})
    let tryFunc = () => {
      if (this.formRef) {
        this.formRef.resetFields()
        this.formRef.setFieldsValue({...record})
        return true
      }
      return false
    }
    trySeveralTimes(tryFunc, 500, 10)
  }
  // 表项操作html代码
  tableOpeHtml = (record) => {
    let tipStr = `确定要将这项标记删除吗? (ip=${record.ip} tag=${record.tag})`
    return (
      <>
        <Tooltip title='修改标记'>
          <a onClick={() => this.onShowModel(record)}>
            <FormOutlined style={{ color: '#1890ff', fontSize: '1.2em', marginRight: '1em' }} />
          </a>
        </Tooltip>
        <Popconfirm placement='bottom' title={tipStr} okType='danger' okText='删除' cancelText='取消'
          onConfirm={() => this.onComfirmDelTag(record)}>
          <a><DeleteOutlined style={{ color: '#ff3535', fontSize: '1.2em' }} /></a>
        </Popconfirm>
      </>
    )
  }

  render () {
    const columns = [
      { title: 'IP地址', dataIndex: 'ip', align: 'left' },
      { title: '标记', dataIndex: 'tag', align: 'left'},
      { title: '访问次数', dataIndex: 'times', align: 'left'},
      { title: '操作', align:'center', render: (item, record) => this.tableOpeHtml(record)},
    ]

    const { displayList } = this.props.model
    const { modelvisible } = this.state

    return (
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={displayList} defaultPageSize={50} size='small'/>
        </Col>
        <Modal title='修改标记' visible={modelvisible} footer={null}
          onCancel={() => {this.setState({modelvisible: false})}}>
          <Form onFinish={this.onComfirmUpdateTag}
            initialValues={{ ip:'', tag:'' }}
            labelCol={{align:'left', span:'4'}}
            wrapperCol={{span:'18', align:'left'}}
            ref={form => { this.formRef = form }}>
            <Form.Item label='IP' name='ip' tooltip='改变ip地址会新增ip标记'>
              <Input />
            </Form.Item>
            <Form.Item label='标记' name='tag'>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                  确定修改
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    )
  }
}

export default IpWhiteList