import { combineReducers } from 'redux'
import { loadinfoReducer } from './inputForm'
import { text2Reducer, titleReducer, compareReducer, wordsReducer, clearSceneReducer } from './visualizer'


const rootReducer = combineReducers({
	text2: text2Reducer,
	graphtitle: titleReducer,
	compare: compareReducer,
	labels: require('./inputForm').default,
	words: wordsReducer,
	loadinfo: loadinfoReducer,
	clearSceneBool: clearSceneReducer
})

export default rootReducer
