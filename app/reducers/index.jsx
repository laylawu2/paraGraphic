import { combineReducers } from 'redux'
import { loadinfoReducer } from './inputForm'
import { titleReducer, compareReducer, wordsReducer } from './visualizer'


const rootReducer = combineReducers({
	// text2: text2Reducer,
	graphtitle: titleReducer,
	compare: compareReducer,
	labels: require('./inputForm').default,
	words: wordsReducer,
	loadinfo: loadinfoReducer
})

export default rootReducer
