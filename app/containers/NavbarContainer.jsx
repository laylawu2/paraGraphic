import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';

import { getEntry } from '../reducers/visualizer'
import { ACCEL, BO_INAUG, fetchData } from '../reducers/getData';

const mapDispatchToProps = (dispatch) => ({
	getSample: () => {
		dispatch(getEntry(ACCEL));
		dispatch(fetchData(ACCEL));
	},
	getCompareSample: () => {
		dispatch(getEntry(BO_INAUG));
		dispatch(fetchData(BO_INAUG));
	}
});

export default connect(null, mapDispatchToProps)(Navbar);