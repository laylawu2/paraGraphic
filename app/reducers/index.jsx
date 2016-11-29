import { combineReducers } from 'redux'
import { loadinfoReducer } from './inputForm'
import { text2Reducer, titleReducer, compareReducer } from './visualizer'


const rootReducer = combineReducers({
	text2: text2Reducer,
	graphtitle: titleReducer,
	compare: compareReducer,
	labels: require('./inputForm').default,
	words: require('./visualizer').default,
	loadinfo: loadinfoReducer
})

export default rootReducer
