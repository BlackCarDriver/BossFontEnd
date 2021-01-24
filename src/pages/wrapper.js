/* eslint-disable quotes */
import React, { Component } from 'react'
import { Menu, Layout, Switch, Card } from 'antd'
import { getIconByName } from '../common/utils/antIcon'
import { Link } from 'dva/router'

class Wrapper extends Component {
    componentDidMount = () => {
      this.initMeanuData()
      this.initcarTitle()
      console.debug('props=', this.props)
      console.debug('history2=', this.props.history)
    }
    state = {
      theme: 'dark',
      current: '1',
      menuData: [],
      carTitle: 'Welcome',
      openMenu: '', // 默认展开的菜单
      selectMenu: '', // 默认选中的菜单
    }

    // 改变导航栏风格
    changeTheme = value => {
      this.setState({ theme: value ? 'dark' : 'light'})
    }
    // 将路由转换成菜单
    formatter = (data, parentPath = '') => {
      return data.filter(item => item.name).map(item => {
        const result = {
          ...item,
        }
        if (item.routes) {
          const children = this.formatter(item.routes, `${parentPath}${item.path}/`, item.authority)
          result.children = children
        }
        delete result.routes
        return result
      })
    }
    // 初始化state.menuData
    initMeanuData = () => {
      const {
        route: { routes }
      } = this.props
      let menu = this.formatter(routes)
      this.setState({menuData: menu})
    }
    // 更新或初始化标题，展开和选中的菜单
    initcarTitle = () => {
      const { pathname } = this.props.location
      console.debug('pathname=', pathname)
      let eles = pathname.split('/')
      if (eles.length >= 2) {
        this.setState({openMenu: eles[1]})
        this.setState({selectMenu: pathname})
      }
    }

    // 动态创建导航栏菜单
    creatMeamBar = () => {
      console.debug('creatMeamBar call')
      let { SubMenu } = Menu
      const {menuData, openMenu, selectMenu, theme} = this.state
      console.debug('meanData=', menuData)
      let key = 0
      return(
        // TODO: why defaultOpenKeys not working?
        <Menu theme={theme} mode='inline' multiple={false} defaultOpenKeys={[openMenu]} defaultSelectedKeys={[selectMenu]}>
          <Menu.Item key='-1'>
            <Switch checked={this.state.theme === 'dark'} onChange={this.changeTheme} checkedChildren='Dark' unCheckedChildren='Light'/>
          </Menu.Item>
          {
            menuData.map((item) => {
              if (item.children != null){
                return (
                  <SubMenu key={'' + key++} title={item.name} icon={getIconByName(item.icon)}>
                    { item.children.map((subitem) => {
                      return(
                        <Menu.Item key={subitem.path} title={subitem.name} icon={getIconByName(subitem.icon)} >
                          <Link to={subitem.path} onClick={() => {this.setState({carTitle: subitem.desc})}}>{subitem.name}</Link>
                        </Menu.Item>
                      )
                    }) }
                  </SubMenu>
                )
              }
            })
          }
        </Menu>
      )
    }

    render () {
      const { Content, Footer, Sider } = Layout
      return (
        <div>
          <Layout>
            <Sider theme={this.state.theme} style={{ overflow: 'auto', minHeight: '100vh', position: 'fixed', left: 0}} >
              <div style={styleLogo}>
                <a href='/boss'><img src='./assets/logo.PNG' alt='logo' style={sytleImg} /></a>
              </div>
              {this.creatMeamBar()}
            </Sider>

            <Layout style={{height:'100vh', padding:'0 24px 0 224px'}}>
              <Content>
                <div style={styleContent}>
                  <Card title={this.state.carTitle} bordered={false} headStyle={{font: 'left' ,height:'3em'}}>
                    {this.props.children}
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