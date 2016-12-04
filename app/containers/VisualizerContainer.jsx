import React from 'react';
import { connect } from 'react-redux';

import Visualizer from '../components/Visualizer';
import { updatePageStatus } from '../reducers/inputForm'

const mapStateToProps = ({ pageStatus, visInfo }) => ({      // needs access to this info on store & updates
	pageStatus,												 // to this info
	visInfo
});

const mapDispatchToProps = (dispatch) => ({
	updateStatus: (status) => {
		dispatch(updatePageStatus(status));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);