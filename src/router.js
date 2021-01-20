import React from 'react'
import { Router } from 'dva/router'
import dynamic from './common/utils/dynamic'
import renderRoutes from './common/utils/renderRoutes'

// dynamic.setDefaultLoadingComponent(require('./components/PageLoading').default)

function formatUri (uri) {
  return uri.replace('.html', '').replace(/\?.*/, '')
}

function snake2Pascal (snake) {
  snake = snake.charAt(0) === '/' ? snake.substr(1) : snake
  return snake.split('/').map(item => item.split('_').map(word => word.charAt(0).toUpperCase() + word.substr(1)).join('')).join('/').replace(/-.*/, '')
}

function transformRoute (item, index, app, parentPath = '') {
  const { title, menuItemList, uri, icon } = item
  // 有子菜单的情况
  if (Array.isArray(menuItemList)) {
    const path = parentPath + '/' + index
    return {
      name: title,
      path,
      icon,
      routes: menuItemList.map((item, index) => transformRoute(item, index, app, path))
    }
  }

  // 已经是子项的情况
  const formatedUri = formatUri(uri)
  const path = parentPath + '/' + (formatedUri.charAt(0) === '/' ? formatedUri.substr(1) : formatedUri) // => /0/server_deubg/server_debug_time_control
  const componentPath = `./pages/${snake2Pascal(formatUri(uri))}/`
  console.debug('componentPath=', path)
  return {
    name: title,
    path,
    uri,
    icon,
    component: dynamic({
      app,
      models: () => [
        (async () => {
          try {
            console.debug('load model: ', componentPath + 'model.js')
            return await import(componentPath + 'model.js')
          } catch (err) {
            console.log('can not import', componentPath)
          }
        })()
      ],
      component: async () => {
        let promiseComponent
        try {
          console.debug('load index: ', componentPath + 'index.js')
          promiseComponent = await import(componentPath + 'index.js')
        } catch (err) {
          console.error('load component fail: error=', err)
          promiseComponent = await import('./pages/notfound')
        }
        return promiseComponent
      }
    })
  }
}

function transformRoutes (rawRoutes, app) {
  return rawRoutes.map((item, index) => transformRoute(item, index, app))
}

export default rawRoutes => ({ history, app }) => {
  const routes = [
    {
      path: '/',
      redirect: '/home',
      exact: true
    },
    {
      path: '/',
      component: dynamic({
        component: () => import('./pages/wrapper')
      }),
      routes: [
        ...transformRoutes(rawRoutes, app),
        {
          path: '/home',
          exact: true,
          component: require('./pages/Tool/ReqDetail').default
        },
        {
          component: require('./pages/notfound').default
        }
      ]
    }
  ]

  return (
    <Router history={history}>
      {renderRoutes(routes)}
    </Router>
  )
}
