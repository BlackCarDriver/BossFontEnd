/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react'
import { Tabs, Input, Image, Row, Col, Select } from 'antd'

class PhotoWhall extends Component {
  state = {
    textAreaValue: 'http://www.blackcar.top/static/preview/%E8%A6%81%E9%A5%AD%E5%A4%B4%E5%83%8F.jpg\nhttps://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    imgList : [],
    imgWhite : 150,
  }

  // 标签页发生切换
  onTagChange = (record) => {
    if (record === '2') { // 切换到'显示图片'标签页
      this.updatePictureWalls()
    }
  }
  // 更新图片列表
  updatePictureWalls = () => {
    const { textAreaValue } = this.state
    if (textAreaValue == '') {
      return
    }
    let imgList = textAreaValue.split('\n')
    let checkList = []
    let srcReg = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i
    for (let i = 0; i < imgList.length; i++) {
      if (srcReg.test(imgList[i])) {
        checkList.push(imgList[i])
      }
    }
    console.debug('checkList=', checkList)
    this.setState({imgList: checkList})
  }
  // 输入框改变
  onTextAreaEdit = (e) => {
    if(e && e.target && e.target.value){
      let value = e.target.value
      console.debug('textAreaValue=', value)
      this.setState({textAreaValue:value })
    }
  }
  // 改变图片宽度
  onSelectImgSize = (v) => {
    let width = parseInt(v)
    this.setState({imgWhite: width})
  }

  render () {
    const { TabPane } = Tabs
    const { TextArea } = Input
    const { Option } = Select
    const { imgWhite, imgList, textAreaValue } = this.state
    const placeholderUrl = 'https://img-blog.csdnimg.cn/20210129005143472.PNG'
    const placeholderImg = <Image preview={false} width={this.state.imgWhite} height={this.state.imgWhite} src={placeholderUrl}/>

    return (
      <Tabs defaultActiveKey='1' type='card' size='large'
        onChange={(record) => this.onTagChange(record)}>
        <TabPane tab='编辑列表' key='1'>
          <TextArea placeholder='输入图片url,每行一个...'
            defaultValue={textAreaValue}
            allowClear autoSize={{minRows: 10}}
            onChange={(e) => this.onTextAreaEdit(e)}/>
        </TabPane>
        <TabPane tab='图片墙' key='2'>
          <Select defaultValue='150' onChange={(v) => {this.onSelectImgSize(v)}}>
            <Option value='25'>25px</Option>
            <Option value='50'>50px</Option>
            <Option value='70'>75px</Option>
            <Option value='100'>100px</Option>
            <Option value='150'>150px</Option>
            <Option value='200'>200px</Option>
            <Option value='300'>300px</Option>
            <Option value='400'>400px</Option>
            <Option value='800'>800px</Option>
          </Select>
          <Row>
            {imgList.map((item, index) => {
              return(
                <Col key={index} style={{margin:'15px 15px 0 0'}}>
                  <Image width={imgWhite} height={imgWhite} src={item} alt={item} placeholder={placeholderImg} fallback={placeholderUrl} style={{overflow:'hidden'}}/>
                </Col>
              )

            })}
          </Row>
        </TabPane>
      </Tabs>
    )
  }
}

export default PhotoWhall