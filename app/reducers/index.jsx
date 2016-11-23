import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default, 
  visReducer:  require('./visualizer').default
})

export default rootReducer
