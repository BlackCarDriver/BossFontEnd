import React from 'react'
import { Router, Route, Redirect, Switch } from 'dva/router'
import Wrapper from './pages/wrapper'

function RouterConfig ({ history }) {
  console.debug('history=', history)
  return (
    <Router history={history}>
      <Switch>
        <Route path='/boss' component={Wrapper} />
        <Redirect from='*' to='/boss' />
      </Switch>
    </Router>
  )
}

export default RouterConfig
