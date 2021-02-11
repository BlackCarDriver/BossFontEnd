/* eslint-disable quotes */
import React, { Component } from 'react'
import { connect } from 'dva'
import { timeFormater, sizeFormater } from '../../../common/utils/util'
import { DeleteOutlined, CloudDownloadOutlined, EyeOutlined, InboxOutlined } from '@ant-design/icons'
import { Tabs, Row, Col, Table, Tooltip, Popconfirm, message, Upload, Progress, Divider, Tag } from 'antd'

const namespace = 'netDish'

@connect(({ netDish }) => ({
  model: netDish
}))

class NetDish extends Component {
  state = {
    uploadFileName: '',
    uploadPersent: 0,
    uploadStatus: '',
    uploadMsg: '',
  }
  componentDidMount = () => {
    this.updateFilesList()
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
  // 切换标签页
  onChangeTag = (key) => {
    if (key == '1') { // 查看文件列表
      this.updateFilesList()
    }
  }
  // 表格数据变更
  onTableChange = (pagination) => {
    const { current, pageSize } = pagination
    this.changeState('page', current)
    this.changeState('size', pageSize)
  }
  // 刷新文件列表
  updateFilesList = () => {
    this.callModel('queryList')
  }
  // 删除文件
  onComfirmDelFile = (record) => {
    console.debug('delete record=', record)
    let callback = (success) => {
      if (success) {
        message.success('删除成功')
      } else {
        message.error('删除失败')
      }
      this.updateFilesList()
    }
    this.callModel('deleteFile', {
      fileName: record.fileName,
      callback: callback,
    })
  }
  // 表格操作代码生成
  operationHtml = (record) => {
    let tipStr = `确定要将这个文件删除吗? (名称=${record.fileName})`
    return (
      <>
        <Tooltip title='下载'>
          <a href={`/bsapi/tool/netdish/fileOpe?opeType=download&fileName=${record.fileName}`}>
            <CloudDownloadOutlined style={{ color: '#1890ff', fontSize: '1.2em', marginRight: '1em' }} />
          </a>
        </Tooltip>
        <Tooltip title='预览'>
          <a href={`/static/preview/${record.fileName}`} target='null'>
            <EyeOutlined style={{ color: '#1890ff', fontSize: '1.2em', marginRight: '1em' }} />
          </a>
        </Tooltip>
        <Tooltip title='删除'>
          <Popconfirm placement='bottom' title={tipStr} okType='danger' okText='删除' cancelText='取消'
            onConfirm={() => this.onComfirmDelFile(record)}>
            <a href='#'><DeleteOutlined style={{ color: '#ff3535', fontSize: '1.2em' }} /></a>
          </Popconfirm>
        </Tooltip>
      </>
    )
  }

  render () {
    const { TabPane } = Tabs
    const { Dragger } = Upload
    const { displayData, currentPage, currentSize} = this.props.model
    const {uploadFileName, uploadPersent, uploadStatus, uploadMsg } = this.state
    const uploadProps = {
      name: 'file',
      multiple: false,
      action: '/bsapi/tool/netdish/upload',
      onChange: (info) => {
        const { response, status, percent } = info.file
        if (status === 'uploading') {
          console.debug('uploading: info=', info)
          this.setState({uploadFileName:info.file.name, uploadPersent: percent, uploadStatus: 'normal', uploadMsg:''})
          return
        }
        if (status === 'done' && response != null ) {
          if (response.status == 0){
            message.success(`${info.file.name} uploaded successfully.`)
            this.setState({uploadStatus: 'success'})
          }else{
            message.error(`${info.file.name} uploaded failed: msg=${response.msg}.`)
            this.setState({uploadStatus: 'exception', uploadMsg: response.msg})
          }
          return
        }
        if (status === 'error') {
          message.error(`${info.file.name} upload failed.`)
          this.setState({uploadStatus: 'exception', uploadMsg: '?'})
        }
      },
    }
    const columns = [
      { title: '序号', render: (text, record, index) => (currentPage - 1) * currentSize + index + 1 },
      { title: '文件名', dataIndex: 'fileName', align: 'center'},
      { title: '文件大小', dataIndex: 'size', align: 'center',
        sorter: (a, b) => a.size - b.size,
        render: (v) => sizeFormater(v),
      },
      { title: '更新时间', dataIndex: 'timestamp', align: 'center',
        sorter: (a, b) => a.timestamp - b.timestamp,
        render:(v) => timeFormater(v)},
      { title: '操作', render:(v, r) => this.operationHtml(r), align: 'center'},
    ]

    return (
      <Tabs defaultActiveKey='1' onChange={(e) => {this.onChangeTag(e)}} style={{marginTop: '-1.5em'}}>
        <TabPane tab='文件列表' key='1'>
          <Row>
            <Col span={24}>
              <Table columns={columns} dataSource={displayData} size='small' pagination={{defaultPageSize:15}}
                onChange={(pagination) => { this.onTableChange(pagination) }}/>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab='上传文件' key='2'>
          <Dragger {...uploadProps} style={{width:'100%'}}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>将需要上传的文件拖动到这里</p>
            <p className='ant-upload-hint'>
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
            </p>
            <div hidden={uploadFileName == ''}>
              <Divider />
              <Tag color='geekblue'>{uploadFileName}</Tag><br />
              <Tag color='error' hidden={uploadMsg == ''}>{uploadMsg}</Tag><br/>
              <Progress type='circle' percent={uploadPersent} status={uploadStatus} />
            </div>
          </Dragger>
        </TabPane>

      </Tabs>
    )
  }
}

export default NetDish