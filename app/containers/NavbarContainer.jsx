import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { loadLabels } from '../reducers/inputForm';
import { getWords, getTitle } from '../reducers/visualizer';
import Navbar from '../components/Navbar';

import { ACCEL, INPUT_BO, fetchSample } from '../reducers/samples';

const mapDispatchToProps = (dispatch) => ({
	getSample: () => dispatch(fetchSample(ACCEL)),
	getCompareSample: () => dispatch(fetchSample(INPUT_BO)),
});

export default connect(null, mapDispatchToProps)(Navbar);