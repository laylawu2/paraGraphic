import axios from 'axios'

const RECEIVE_LABELS = 'RECEIVE_LABELS'

const processLabels = (labels) => {
	console.log("labels", labels);
	let result = {},
		coords = [[-0.1, 0, 0],
			      [1, 0, 0],
			      [0, -0.1, 0],
			      [0, 1, 0],
			      [0, 0, -0.1],
			      [0, 0, 0.99]];
	result[labels.x[0]] = coords[0];
	result[labels.x[1]] = coords[1];
	result[labels.y[0]] = coords[2];
	result[labels.y[1]] = coords[3];
	result[labels.z[0]] = coords[4];
	result[labels.z[1]] = coords[5];
	return result;
}

export const loadLabels = (labels) => ({
	type: RECEIVE_LABELS,
	labels: processLabels(labels)
})

export default (state={}, action) => {
  switch(action.type) {
    case RECEIVE_LABELS:
      return action.labels 
  }
  return state
};