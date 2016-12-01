import axios from 'axios'

const RECEIVE_LABELS = 'RECEIVE_LABELS'
const RECEIVE_INFO = 'RECEIVE_INFO'
const processLabels = (labels) => {
	console.log("labels in processLabels function call", labels);
	let result = {},
		// predefined coordinates for each label
		// in order: xmin, xmax, ymin, ymax, zmin, zmax
		coords = [[-0.1, 0, 0],
			      [0.9, 0, 0],
			      [0, -0.1, 0],
			      [0, 0.9, 0],
			      [0, 0, -0.1],
			      [0, 0, 0.9]];


	//result[labels.x[0][0].toUpperCase()] = coords[0];
	result[labels.x[0].toUpperCase()] = coords[1];
	//result[labels.y[0][0].toUpperCase()] = coords[2];
	result[labels.y[0].toUpperCase()] = coords[3];
	//result[labels.z[0][0].toUpperCase()] = coords[4];
	result[labels.z[0].toUpperCase()] = coords[5];
	return result;
}

// action creator
export const loadLabels = (labels) => ({
	type: RECEIVE_LABELS,
	labels: processLabels(labels)
})

// reducer
export default (state={}, action) => {
  switch(action.type) {
    case RECEIVE_LABELS:
      return action.labels
  }
  return state
};

// action creator
export const loadInfofunc = (loadinfo) => ({
    type: RECEIVE_INFO,
    loadinfo
})

// reducer
export const loadinfoReducer = (state = false, action) => {
	switch(action.type) {
		case RECEIVE_INFO:
			return action.loadinfo
	}
	return state;
};