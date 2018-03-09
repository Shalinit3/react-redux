import { Map } from 'immutable'

/**
 *
 * @param {*} state
 * @param {*} action
 */

let initialState = Map().set('OK', Map())

let demoReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default demoReducer
