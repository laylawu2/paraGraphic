import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default, 
  words:  require('./visualizer').default
})

export default rootReducer
