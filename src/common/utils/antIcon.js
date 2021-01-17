/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-key */

import {
  StockOutlined,
  DropboxOutlined,
  QuestionOutlined,
  DashboardOutlined,
  CloudUploadOutlined,
  FileTextOutlined,
  AimOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'


const iconMap = new Map(
  [
    ['StockOutlined', <StockOutlined/>],
    ['DashboardOutlined', <DashboardOutlined />],
    ['DropboxOutlined', <DropboxOutlined/>],
    ['CloudUploadOutlined', <CloudUploadOutlined />],
    ['FileTextOutlined', <FileTextOutlined />],
    ['QuestionOutlined', <QuestionOutlined />],
    ['AimOutlined', <AimOutlined />],
    ['AppstoreOutlined', <AppstoreOutlined />],
  ]
)

export function getIconByName (name){
  let icon = iconMap.get(name)
  if (icon == null) {
    return null
  }
  return icon
}