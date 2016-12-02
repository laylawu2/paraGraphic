import { combineReducers } from 'redux';
import { loadinfoReducer } from './inputForm';
import { text2Reducer, titleReducer, wordsReducer, titlesReducer, entryReducer } from './visualizer';

const rootReducer = combineReducers({
	// text2: text2Reducer,
	graphtitle: titleReducer,
	titles: titlesReducer,
	labels: require('./inputForm').default,
	words: wordsReducer,
	loadinfo: loadinfoReducer,
  entry: entryReducer
});

export default rootReducer;
