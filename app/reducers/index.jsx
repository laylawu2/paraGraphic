import { combineReducers } from 'redux'
import { labelReducerLarge, loadinfoReducer } from './inputForm'
import { text2Reducer, titleReducer } from './visualizer'


const rootReducer = combineReducers({
	text2: text2Reducer,
	labelsLarge: labelReducerLarge,
	graphtitle: titleReducer,
	labels: require('./inputForm').default,
	words: require('./visualizer').default,
    loadinfo:loadinfoReducer
})

export default rootReducer
