import React, { Component } from 'react'
import { Col, Row, Calendar, Card, Divider, Tag } from 'antd'

class NotFound extends Component {
  host = window.location.host
  uploadDemo = `curl -F 'file=@default.conf' http://${this.host}/static/upload`
  downloadDemo = `wget --no-check-certificate http://${this.host}/download/abcdefgddd`
  preViewDemo = `http://${this.host}/static/preview/target.jpg`

  render () {
    window.isInit = true
  	return (
      <div>
        <Row>
          <Col span={8}>
            <Card type='inner' title='CallDriver 应用' style={{width:'90%'}}>
              <a href='/callDriver' target='null'>CallDriver - guest</a>
              <Divider />
              <a href='/callDriver/boss' target='null'>CallDriver - adminstrator</a>
            </Card>
          </Col>
          <Col span={8}>
            <Card type='inner' title='文件传送' style={{ marginTop: 16 , width:'90%'}}>
              <Tag color='geekblue'>上传文件 demo</Tag>
              <p>{this.uploadDemo}</p>
              <Divider />
              <Tag color='geekblue'>上传下载 demo</Tag>
              <p>{this.downloadDemo}</p>
              <Divider />
              <Tag color='geekblue'>文件预览 demo</Tag>
              <p>{this.preViewDemo}</p>
            </Card>
          </Col>
          <Col span={8}>
            <Calendar style={style} fullscreen={false} />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Card type='inner' title='隐藏功能' style={{width:'90%'}}>
              <a href={`http://${this.host}/reqMsg`} target='null'>查看请求详情</a>
              <Divider />
              <a href={`http://${this.host}/reqLog`} target='null'>查看后端日志</a>
              <Divider />
              <a href={`http://${this.host}/manage`} target='null'>旧版管理页面</a>
            </Card>
          </Col>
          <Col span={8} />
          <Col span={8}>
            <Card type='inner' title='克隆站点' style={{width:'90%'}}>
              <a href={`http://${this.host}/blog`} target='null'>My学习笔记</a>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const style = {
  width: '100%',
  border: '1px solid #f0f0f0',
  borderRadius: '2px',
}

export default NotFound
