import { combineReducers } from 'redux'
import { loadinfoReducer } from './inputForm'
<<<<<<< HEAD
import { text2Reducer, titleReducer, compareReducer, titlesReducer } from './visualizer'
=======
import { text2Reducer, titleReducer, compareReducer, wordsReducer } from './visualizer'
>>>>>>> master


const rootReducer = combineReducers({
	text2: text2Reducer,
	graphtitle: titleReducer,
	compare: compareReducer,
  titles: titlesReducer,
	labels: require('./inputForm').default,
	words: wordsReducer,
	loadinfo: loadinfoReducer
})

export default rootReducer
