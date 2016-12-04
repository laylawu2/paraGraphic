import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';

import { ACCEL, BO_INAUG, fetchData } from '../reducers/getData';

const mapDispatchToProps = (dispatch) => ({
	getSample: () => dispatch(fetchData(ACCEL, ACCEL.title)),
	getCompareSample: () => dispatch(fetchData(BO_INAUG, BO_INAUG.title))
});

export default connect(null, mapDispatchToProps)(Navbar);