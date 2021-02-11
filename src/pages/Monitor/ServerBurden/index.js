import React, { Component } from 'react'
import { connect } from 'dva'
import { Space, Typography, Select, Button, Row, Col, Card, Tag } from 'antd'
// import { Line, Gauge } from '@ant-design/charts'
const { Line, Gauge } = window.charts

const namespace = 'serverBurden'

@connect(({ serverBurden }) => ({
  model: serverBurden
}))

class ServerBurden extends Component {
  state = {
    title: 'SUCCESS'
  }
  componentDidMount = () => {
    let autoRefresh = () => { // 每隔10s刷新数据
      const {keepRefresh} = this.props.model
      if (!keepRefresh) {
        return
      }
      this.callModel('queryList', {})
      setTimeout(() => {
        autoRefresh()
      }, 10000)
    }
    autoRefresh()
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
  // 选择显示数据的类型
  onSelectStateType = (value) => {
    this.changeState('statType', value)
    this.callModel('queryList', {})
  }

  render () {
    const { sysStatInfo, realTimeStat} = this.props.model
    const { Option } = Select
    const { Text } = Typography
    let sysStatInfo2 = sysStatInfo.sort((a, b) => {return a.t > b.t ? 1 : -1})
    let LineConfig = {
      data: sysStatInfo2,
      xField: 'time',
      height: 200,
      slider: {
        start: 0.0,
        end: 1.0,
      },
    }
    let GaugeConfig = {
      height: 100,
      animation: false,
      statistic: {
        title: {
          style: { fontSize: '20px', color: '#6395fa', },
          formatter: (a) => { return (a.percent * 100).toFixed(0) + '%' },
        },
      },
    }

    return (
      <Space direction='vertical' style={{width:'100%'}}>
        <Row>
          <Col>
            <Select style={{width:'10em'}} defaultValue='short' onChange={(v) => this.onSelectStateType(v)}>
              <Option key='short'>最近一小时</Option>
              <Option key='long'>最近一周</Option>
            </Select>
          </Col>
          <Col style={{marginLeft:'1em'}}>
            <Button type='primary' onClick={() => this.callModel('queryList', {})}>刷新</Button>
          </Col>
        </Row>

        <Text type='success'>实时指标</Text>
        <Row>
          <Col style={{ width: 200, marginLeft: '1em', padding:'1em' }}>
            <Card>
              <Gauge {...GaugeConfig} percent={realTimeStat.c} />
              <div style={{textAlign:'center', marginTop:'1em'}}><Tag color='lime'>CPU</Tag></div>
            </Card>
          </Col>
          <Col style={{ width: 200, marginLeft: '1em', padding:'1em' }}>
            <Card>
              <Gauge {...GaugeConfig} percent={realTimeStat.v} />
              <div style={{textAlign:'center', marginTop:'1em'}}><Tag color='lime'>VM</Tag></div>
            </Card>
          </Col>
          <Col style={{ width: 200, marginLeft: '1em', padding:'1em' }}>
            <Card>
              <Gauge {...GaugeConfig} percent={realTimeStat.d} />
              <div style={{textAlign:'center', marginTop:'1em'}}><Tag color='lime'>Dish</Tag></div>
            </Card>
          </Col>
          <Col style={{ width: 200, marginLeft: '1em', padding:'1em' }}>
            <Card>
              <Gauge {...GaugeConfig} percent={realTimeStat.a} />
              <div style={{textAlign:'center', marginTop:'1em'}}><Tag color='lime'>Load</Tag></div>
            </Card>
          </Col>
        </Row>

        <Text type='success' max={100}>CPU负载 (%)</Text>
        <Line {...LineConfig} yField='c'/>
        <Text type='success' max={100}>内存使用量 (%)</Text>
        <Line {...LineConfig} yField='v' />
        <Text type='success'>系统负载 (%)</Text>
        <Line {...LineConfig} yField='a' />
        <Text type='success'>进程总数 (%)</Text>
        <Line {...LineConfig} yField='p' />
        <Text type='success' max={100}>磁盘使用量 (%)</Text>
        <Line {...LineConfig} yField='d' />
      </Space>
    )
  }
}

export default ServerBurden