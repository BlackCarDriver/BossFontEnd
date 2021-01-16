import React, { Component } from 'react'
import { Menu, Layout, Switch, Breadcrumb } from 'antd'
import { StockOutlined } from '@ant-design/icons'
import { Route, Link, Redirect, Switch as Switch2 } from 'dva/router'
import NotFound from '../pages/NotFound'
import ServerLog from '../pages/ServerLog'

class Wrapper extends Component {
    componentDidMount = () => {
      console.debug('props=', this.props)
      console.debug('history2=', this.props.history)
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
        const { match } = this.props

        return (
          <div>
            <Layout>
              <Sider theme={this.state.theme} style={{ overflow: 'auto', minHeight: '100vh', position: 'fixed', left: 0}} >
                <div style={styleLogo}>
                  <img src='src/assets/logo.PNG' alt='logo' style={sytleImg} />
                </div>
                <Menu theme={this.state.theme} mode='inline'>
                  <Menu.Item key='0'>
                    <Switch checked={this.state.theme === 'dark'} onChange={this.changeTheme} checkedChildren='Dark' unCheckedChildren='Light'/>
                  </Menu.Item>
                  <SubMenu key='1' icon={<StockOutlined />} title='运行状况'>
                    <Menu.Item key='2'>
                      <Link to={`${match.path}/test`}>测试页面</Link>
                    </Menu.Item>
                    <Menu.Item key='3'>
                      <Link to={`${match.path}/log`}>运行日志</Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>

              <Layout style={{height:'100vh', padding:'0 24px 0 224px'}}>
                <div style={styleHeader}>
                  <Breadcrumb style={styleBread} routes={routes}/>
                </div>
                <Content>
                  <div style={styleContent}>
                    <Switch2>
                      <Route path={`${match.path}/404`} component={NotFound} />
                      <Route path={`${match.path}/log`} component={ServerLog} />
                      <Redirect from='*' to={`${match.path}/404`} />
                    </Switch2>
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