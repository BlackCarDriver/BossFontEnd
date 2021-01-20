/* eslint-disable quotes */
import React, { Component } from 'react'
import { Menu, Layout, Switch, Card } from 'antd'
import { getIconByName } from '../common/utils/antIcon'
import { Link } from 'dva/router'

class Wrapper extends Component {
    componentDidMount = () => {
      this.getMenuData()
      console.debug('props=', this.props)
      console.debug('history2=', this.props.history)
    }
    state = {
      carTitle: 'Welcome',
      theme: 'dark',
      current: '1',
      menuData: [],
    }

    // 改变导航栏风格
    changeTheme = value => {
      this.setState({ theme: value ? 'dark' : 'light'})
    }
    // 选中导航栏功能菜单
    onSelectMeanItem = (item) => {
      console.debug(item)
      if (item.keyPath == null || item.keyPath.length === 0) {

      }
    }
    // Conversion router to menu.
    formatter = (data, parentPath = '') => {
      return data.filter(item => item.name).map(item => {
        const result = {
          ...item,
        }
        if (item.routes) {
          const children = this.formatter(item.routes, `${parentPath}${item.path}/`, item.authority)
          // Reduce memory usage
          result.children = children
        }
        delete result.routes
        return result
      })
    }
    getMenuData () {
      const {
        route: { routes }
      } = this.props
      let menu = this.formatter(routes)
      console.debug('menu=', menu)
      this.setState({menuData: menu})
    }
    // 动态生成菜单栏
    // 动态创建导航栏菜单
    creatMeamBar = () => {
      console.debug('creatMeamBar call')
      const { SubMenu } = Menu
      let {menuData} = this.state
      let key = 1
      return(
      <>
      {
        menuData.map((item) => {
          if (item.children != null){
            return (
              <SubMenu key={key++} title={item.name} icon={getIconByName(item.icon)}>
                { item.children.map((subitem) => {
                  return(
                    <Menu.Item key={key++} title={subitem.name} icon={getIconByName(subitem.icon)} >
                      <Link to={subitem.path}>{subitem.name}</Link>
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