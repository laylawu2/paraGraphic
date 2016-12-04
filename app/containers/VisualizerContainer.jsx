import React from 'react';
import { connect } from 'react-redux';

import Visualizer from '../components/Visualizer';

const mapStateToProps = ({ pageStatus, visInfo }) => ({      // needs access to this info on store & updates
	pageStatus,												 // to this info
	visInfo
});

export default connect(mapStateToProps)(Visualizer);