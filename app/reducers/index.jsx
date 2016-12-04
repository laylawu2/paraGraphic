import { combineReducers } from 'redux';
import { loadinfoReducer, pageStatusReducer } from './inputForm';
import { text2Reducer, titleReducer, wordsReducer, titlesReducer, entryReducer, visReducer } from './visualizer';

const rootReducer = combineReducers({
	titles: titlesReducer,
	loadinfo: loadinfoReducer,
	entry: entryReducer,
	pageStatus: pageStatusReducer,
	visInfo: visReducer
});

export default rootReducer;
