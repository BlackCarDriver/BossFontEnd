import React, { Component } from 'react'
import { Calendar } from 'antd'

class NotFound extends Component {
  render () {
  	return (
      <div>
        <Calendar style={style} fullscreen={false} />
      </div>
    )
  }
}

const style = {
  width: '300px',
  border: '1px solid #f0f0f0',
  borderRadius: '2px',
}

export default NotFound
