import { combineReducers } from 'redux';
import { loadinfoReducer, pageStatusReducer } from './inputForm';
import { titlesReducer, entryReducer, visReducer } from './visualizer';


// combines reducers from other reducer files

const rootReducer = combineReducers({
	titles: titlesReducer,
	loadinfo: loadinfoReducer,
	entry: entryReducer,
	pageStatus: pageStatusReducer,
	visInfo: visReducer
});

export default rootReducer;
