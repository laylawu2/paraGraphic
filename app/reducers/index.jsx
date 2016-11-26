import { combineReducers } from 'redux'
import { labelReducerLarge } from './inputForm'
import { text2Reducer } from './visualizer'


const rootReducer = combineReducers({
	text2: text2Reducer,
	labelsLarge: labelReducerLarge,
	labels: require('./inputForm').default,
	words: require('./visualizer').default
})

export default rootReducer
