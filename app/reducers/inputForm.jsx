import axios from 'axios'

const processLabels = (labels) => {
	let result = {},
		coords = [[-0.1, 0, 0],
			      [1, 0, 0],
			      [0, -0.1, 0],
			      [0, 1, 0],
			      [0, 0, -0.1],
			      [0, 0, 0.99]];
	for(i in labels) {
		result[labels[i]] = coords[i];
	}
	return result;
}

const receiveLabels = lables => ({
	type: 'RECEIVE_LABELS',
	processLabels(labels)
})

export const loadLabels = data =>
  dispatch => {
    const body = JSON.stringify(data);

    return axios.post('/api/words')
      .then(res => {
        dispatch(receiveLabels(res.data));
        browserHistory.push(`/words/${words.id}`);
      });
  };