import React, { Component } from 'react'
// import { Card } from 'antd'
import { Menu, Layout, Switch } from 'antd'
import { MailOutlined } from '@ant-design/icons'

class Wrapper extends Component { // 要改
    componentDidMount = () => {
      console.debug('init success')
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
                <div className='ant-pro-sider-logo' id='logo'>
                  <a><img src='assets/logo.f0355d39.svg' alt='logo' /><h1>Ant Design Pro</h1></a>
                </div>
                <Menu theme={this.state.theme} mode='inline'>
                  <Menu.Item key='0'>
                    <Switch checked={this.state.theme === 'dark'} onChange={this.changeTheme} checkedChildren='Dark' unCheckedChildren='Light'/>
                  </Menu.Item>
                  <SubMenu key='1' icon={<MailOutlined />} title='Navigation One'>
                    <Menu.Item key='1'>Option 1</Menu.Item>
                    <Menu.Item key='2'>Option 2</Menu.Item>
                    <Menu.Item key='3'>Option 3</Menu.Item>
                    <Menu.Item key='4'>Option 4</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>

              <Layout className='site-layout' style={{ marginLeft: 200 }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                  <div className='site-layout-background' style={{ padding: 24, textAlign: 'center' }}>
                      it is content
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
              </Layout>

            </Layout>
          </div>
        )
      }
}

export default Wrapper // 要改