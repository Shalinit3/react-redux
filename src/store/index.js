import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import demoReducer from './demo'

const robokindStore = combineReducers({
  demoReducer,
  routing: routerReducer
})

export default robokindStore
