import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	labels: require('./inputForm').default,
	words: require('./visualizer').default
})

export default rootReducer
