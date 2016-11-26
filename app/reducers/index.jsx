import { combineReducers } from 'redux'

// import {labels} from './inputForm'


const rootReducer = combineReducers({
	labels: require('./inputForm').default,
	words: require('./visualizer').default
})

export default rootReducer
