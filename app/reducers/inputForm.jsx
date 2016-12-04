import axios from 'axios'

const RECEIVE_INFO = 'RECEIVE_INFO'
const UPDATE_PAGE_STATUS = 'UPDATE_PAGE_STATUS'

const labelAxes = (wordDataObj) => {
	let axes = {};
	axes['x'] = wordDataObj['axis1'];
	axes['y'] = wordDataObj['axis2'];
	axes['z'] = wordDataObj['axis3'];
	return axes
}

// action creator
// loadinfo is a boolean that controls whether app info or input form is rendered in the Drawer component
export const loadInfofunc = (loadinfo) => ({
    type: RECEIVE_INFO,
    loadinfo
})

// reducer for loadinfo
export const loadinfoReducer = (state = false, action) => {
	switch(action.type) {
		case RECEIVE_INFO:
			return action.loadinfo
	}
	return state;
};

export const updatePageStatus = (pageStatus) => ({
	type: UPDATE_PAGE_STATUS,
	pageStatus
});

export const pageStatusReducer = (state = 'loading', action) => {
	switch(action.type) {
		case UPDATE_PAGE_STATUS:
			return action.pageStatus
	}
	return state;
}