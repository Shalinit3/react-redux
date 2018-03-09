/**
 * Main Route Componet - defined with
 *  - middlewares
 *  - sub routes
 *  - redux store
 */

import React from 'react'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { composeWithDevTools } from 'redux-devtools-extension'

import createHistory from 'history/createBrowserHistory'
import { Switch } from 'react-router-dom'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import thunk from 'redux-thunk'

import robokindStore from '../store'

import DashboardRoute from './DashboardRoute'

function Route () {
  const history = createHistory()
  const rMiddleware = routerMiddleware(history)

  let middleware = applyMiddleware(thunk, rMiddleware)

  let enhancers = composeWithDevTools(
    middleware
  )

  let store = createStore(
    robokindStore,
    enhancers
  )

  return (
    <Provider store={store}>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
        <Switch>
          <DashboardRoute />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default Route
