import axios from 'axios'

const RECEIVE_LABELS = 'RECEIVE_LABELS'

const processLabels = (labels) => {
	console.log("labels", labels);
	let result = {},
		// predefined coordinates for each label
		// in order: xmin, xmax, ymin, ymax, zmin, zmax
		coords = [[-0.1, 0, 0],
			      [0.9, 0, 0],
			      [0, -0.1, 0],
			      [0, 0.9, 0],
			      [0, 0, -0.1],
			      [0, 0, 0.9]];

	result[labels.x[0].toUpperCase()] = coords[0];
	result[labels.x[1].toUpperCase()] = coords[1];
	result[labels.y[0].toUpperCase()] = coords[2];
	result[labels.y[1].toUpperCase()] = coords[3];
	result[labels.z[0].toUpperCase()] = coords[4];
	result[labels.z[1].toUpperCase()] = coords[5];
	console.log(result, ",,,,,,,,,,,,,,,,,,,,,");
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
