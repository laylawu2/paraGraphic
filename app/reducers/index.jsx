import { combineReducers } from 'redux'

import {labels} from './inputForm'


const rootReducer = combineReducers({
 // labels:
  words: require('./visualizer').default
})

export default rootReducer
