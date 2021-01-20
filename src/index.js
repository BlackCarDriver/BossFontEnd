import dva from 'dva'
import 'antd/dist/antd.css'
import router from './router'

// 1. Initialize
const app = dva()

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./pages/Tool/NetDish/mo').default)

// 4. Router
let menuList = [{
  title: '服务端工具', icon: 'AppstoreOutlined',
  menuItemList: [
    { uri: '/tool/reqDetail', title: '请求详情', icon:'AimOutlined' },
    { uri: '/tool/netDish', title:  '个人网盘', icon:'CloudUploadOutlined'},
  ]
},{
  title: '服务器监控', icon: 'DashboardOutlined',
  menuItemList: [
    { uri: '/monitor/serverBurden', title:  '系统负载' , icon:'DashboardOutlined'},
    { uri: '/monitor/serverLog', title:  '服务端日志', icon:'FileTextOutlined' },
  ]
}]
app.router(router(menuList))

// 5. Start
app.start('#root')
