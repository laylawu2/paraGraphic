import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { loadLabels } from '../reducers/inputForm'
import { getWords, getTitle } from '../reducers/visualizer'
import Graphic from '../components/Graphic'

import { ACCEL, INPUT_BO, DRUMPF, fetchSample } from '../reducers/samples'

const mapDispatchToProps = (dispatch) => ({
	getSample: () => dispatch(fetchSample(ACCEL)),
	getCompareSample: () => dispatch(fetchSample(INPUT_BO, DRUMPF)),
});

export default connect(null, mapDispatchToProps)(Graphic)