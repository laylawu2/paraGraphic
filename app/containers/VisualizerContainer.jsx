import React from 'react';
import { connect } from 'react-redux';

import Visualizer from '../components/Visualizer';
import { updatePageStatus } from '../reducers/inputForm'

const mapStateToProps = ({ labels, words, graphtitle, compare }) => ({
	labels, 
	words,
	graphtitle,
	compare
});

const mapDispatchToProps = (dispatch) => ({
	updateStatus: (status) => {
		dispatch(updatePageStatus(status));
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);