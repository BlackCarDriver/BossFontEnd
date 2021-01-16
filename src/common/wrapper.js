import React, { Component } from 'react'
import { Menu, Layout, Switch, Breadcrumb } from 'antd'
import { LineChartOutlined } from '@ant-design/icons'

class Wrapper extends Component {
    componentDidMount = () => {
      console.debug('props=', this.props)
    }
    state = {
      theme: 'dark',
      current: '1',
    }
    changeTheme = value => {
      this.setState({
        theme: value ? 'dark' : 'light',
      })
    }
      handleClick = e => {
        console.log('click ', e)
        this.setState({
          current: e.key,
        })
      }

      render () {
        const { SubMenu } = Menu
        const { Content, Footer, Sider } = Layout
        return (
          <div>
            <Layout>
              <Sider theme={this.state.theme} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0}} >
                <div style={styleLogo}>
                  <img src='src/assets/logo.PNG' alt='logo' style={sytleImg} />
                </div>
                <Menu theme={this.state.theme} mode='inline'>
                  <Menu.Item key='0'>
                    <Switch checked={this.state.theme === 'dark'} onChange={this.changeTheme} checkedChildren='Dark' unCheckedChildren='Light'/>
                  </Menu.Item>
                  <SubMenu key='1' icon={<LineChartOutlined />} title='运行状况'>
                    <Menu.Item key='2'>运行日志</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>

              <Layout style={{height:'100vh', padding:'0 24px 0 224px'}}>
                <div style={styleHeader}>
                  <Breadcrumb style={styleBread} routes={routes}/>
                </div>
                <Content>
                  <div style={styleContent}>
                      it is content
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

const routes = [
  { path: 'index', breadcrumbName: 'home'},
  { path: 'first', breadcrumbName: 'first'},
  { path: 'second', breadcrumbName: 'second'},
]

// ---------- style ----------
const styleLogo = {
  width:'100%', height:'60px', overflow: 'hidden'
}
const styleHeader = {
  position:'relative', height:'60px', background:'transparent'
}
const styleContent = {
  background:'#fff', textAlign:'center', minHeight:'10em', padding: '1em'
}
const styleBread = {
  position:'absolute', bottom:'0.5em', fontSize:'1.2em'
}
const sytleImg = {
  height:'100%', width:'100%'
}
// --------------------------

export default Wrapper