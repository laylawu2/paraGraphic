import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Graphic from '../components/Graphic';

import { ACCEL, BO_INAUG, fetchData } from '../reducers/getData'

// can render sample data
const mapDispatchToProps = (dispatch) => ({
	getSample: () => dispatch(fetchData(BO_INAUG, BO_INAUG.title)),
	getCompareSample: () => dispatch(fetchData(ACCEL, ACCEL.title))
});

export default connect(null, mapDispatchToProps)(Graphic);