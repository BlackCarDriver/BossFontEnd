/* eslint-disable quotes */
import React, { Component } from 'react'
import { connect } from 'dva'
import { Menu, Layout, Switch, Card } from 'antd'

import { Route, Link, Redirect, Switch as Switch2 } from 'dva/router'
import { getIconByName } from '../common/utils/antIcon'


// 菜单配置，导航栏和路由组件根据此来动态生成
const meamData = [
  {dir: 'Tool', title:'实用工具', icon:'AppstoreOutlined',
    childs:[
      {dir:'NetDish', title: '私人网盘', icon: 'CloudUploadOutlined', compoment: require('./Tool/NetDish').default},
      {dir: 'ReqDetail', title: '请求信息', icon: 'AimOutlined', compoment: require('./Tool/ReqDetail').default}
    ]},
  {dir: 'Monitor', title: '实时数据', icon:'StockOutlined',
    childs:[
      {dir: 'ServerBurden', title: '机器负载', icon: 'DashboardOutlined', compoment: require('./Monitor/ServerBurden').default},
      {dir:'ServerLog', title: '运行日志', icon: 'FileTextOutlined', compoment: require('./Monitor/ServerLog').default}
    ]},
  {dir: 'notfound', title: '测试页面', compoment: require('./notfound').default}
]

class Wrapper extends Component {
    componentDidMount = () => {
      this.updateMeamData()
      console.debug('props=', this.props)
      console.debug('history2=', this.props.history)
    }
    state = {
      carTitle: 'Welcome',
      theme: 'dark',
      current: '1',
      meam: [],
    }

    // 改变导航栏风格
    changeTheme = value => {
      this.setState({ theme: value ? 'dark' : 'light'})
    }
    // 选中导航栏功能菜单
    onSelectMeanItem = (item) => {
      console.debug(item)
      if (item.keyPath == null || item.keyPath.length === 0) {
        return
      }
      let selectItem = this.getMeamByKey(item.keyPath[0])
      if (selectItem == null) {
        return
      }
      this.setState({carTitle: selectItem.desc})
    }
    // 初始化state.meam
    updateMeamData = () => {
      const { match } = this.props
      const baseURL = match.path
      let meam = meamData
      const rootPath = '../pages'
      let keyVal = 1
      for (let i = 0; i < meam.length; i++){
        meam[i].key = keyVal ++
        if (meam[i].childs == null) {
          meam[i].desc = meam[i].title // 面包屑显示的内容
          meam[i].uri = `${baseURL}/${meam[i].dir}` // 显示组件的路由
          meam[i].path = `${rootPath}/${meam[i].dir}` // 组件加载的位置
          continue
        }
        for (let j = 0; j < meam[i].childs.length; j++) { // 子菜单
          meam[i].childs[j].key = keyVal ++
          meam[i].childs[j].desc = `${meam[i].title} / ${meam[i].childs[j].title}`
          meam[i].childs[j].uri = `${baseURL}/${meam[i].dir}/${meam[i].childs[j].dir}`
          meam[i].childs[j].path = `${rootPath}/${meam[i].dir}/${meam[i].childs[j].dir}`
        }
      }
      console.debug('meam=', meam)
      this.setState({meam: meam})
    }
    // 获取特定key值的meam元素
    getMeamByKey = (key) => {
      const {meam} = this.state
      for (let i = 0; i < meam.length; i++){
        if (meam[i].key == key) {
          return meam[i]
        }
        if (meam[i].childs == null) {
          continue
        }
        for (let j = 0; j < meam[i].childs.length; j++) {
          if (meam[i].childs[j].key == key) {
            return meam[i].childs[j]
          }
        }
      }
      return null
    }
    // 动态加载组件
    dynicLoad = (path, loading = '加载中') => {
      return class AsyncComponent extends React.Component {
          state = {
            Child: null
          }
          async componentDidMount () {
            const { Child } = React.lazy(() => import(path))
            console.debug('path=', path, 'child=', Child)
            this.setState({ Child })
          }
          render () {
            const { Child } = this.state
            return Child ? <Child {...this.props} /> : loading
          }
      }
    }
    // 动态创建导航栏菜单
    creatMeamBar = () => {
      console.debug('creatMeamBar call')
      const { SubMenu } = Menu
      let {meam} = this.state
      return(
      <>
      {
        meam.map((item) => {
          if (item.childs == null){
            return (
              <Menu.Item key={item.key} title={item.title} icon={getIconByName(item.icon)}>
                <Link to={item.uri}>{item.title}</Link>
              </Menu.Item>
            )
          } else {
            return (
              <SubMenu key={item.key} title={item.title} icon={getIconByName(item.icon)}>
                { item.childs.map((subitem) => {
                  return(
                    <Menu.Item key={subitem.key} icon={getIconByName(subitem.icon)}>
                      <Link to={subitem.uri}>{subitem.title}</Link>
                    </Menu.Item>
                  )
                }) }
              </SubMenu>
            )
          }
        })
      }
      </>
      )
    }
    // 动态创建路由组件
    createRouter = () => {
      console.debug('createRouter called')
      const { meam } = this.state
      let tmpRender = (ary) => {
        return ary.map((item) => {
          return <Route key={item.key} path={item.uri} component={item.compoment} />
        })
      }
      return (
        <> {
          meam.map((item) => {
            if (item.childs == null) {
              return <Route key={item.key} path={item.uri} component={item.compoment} />
            } else {
              return tmpRender(item.childs)
            }
          })
        } </>
      )
    }

    render () {
      const { Content, Footer, Sider } = Layout
      return (
        <div>
          <Layout>
            <Sider theme={this.state.theme} style={{ overflow: 'auto', minHeight: '100vh', position: 'fixed', left: 0}} >
              <div style={styleLogo}>
                <img src='src/assets/logo.PNG' alt='logo' style={sytleImg} />
              </div>
              <Menu theme={this.state.theme} mode='inline' onClick={this.onSelectMeanItem}>
                <Menu.Item key='0'>
                  <Switch checked={this.state.theme === 'dark'} onChange={this.changeTheme} checkedChildren='Dark' unCheckedChildren='Light'/>
                </Menu.Item>
                {this.creatMeamBar()}
              </Menu>
            </Sider>

            <Layout style={{height:'100vh', padding:'0 24px 0 224px'}}>
              <Content>
                <div style={styleContent}>
                  <Card title={this.state.carTitle} bordered={false} headStyle={{font: 'left' ,height:'3em'}}>
                    <Switch2>
                      {this.createRouter()}
                      <Redirect from='*' to={require('./notfound').default} />
                    </Switch2>
                  </Card>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                    BlackCarBackDoor ©2021 Created by BlackCarDriver
              </Footer>
            </Layout>

          </Layout>
        </div>
      )
    }
}

// ---------- style ----------
const styleLogo = {
  width:'100%', height:'60px', overflow: 'hidden'
}
const styleContent = {
  marginTop: '2em'
}
const sytleImg = {
  height:'100%', width:'100%'
}
// --------------------------

export default Wrapper