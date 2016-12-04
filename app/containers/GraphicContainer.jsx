import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { loadLabels } from '../reducers/inputForm';
import { getWords, getTitle } from '../reducers/visualizer';
import Graphic from '../components/Graphic';

import { ACCEL, BO_INAUG, fetchSample } from '../reducers/samples'

const mapDispatchToProps = (dispatch) => ({
	getSample: () => dispatch(fetchSample(BO_INAUG)),
	getCompareSample: () => dispatch(fetchSample(ACCEL)),
});

export default connect(null, mapDispatchToProps)(Graphic);