import { combineReducers } from 'redux'
import { labelReducerLarge } from './inputForm'
import { text2Reducer, titleReducer, compareReducer, fullscreenReducer } from './visualizer'


const rootReducer = combineReducers({
	text2: text2Reducer,
	labelsLarge: labelReducerLarge,
	title: titleReducer,
	compare: compareReducer,
	fullscreen: fullscreenReducer,
	labels: require('./inputForm').default,
	words: require('./visualizer').default
})

export default rootReducer
