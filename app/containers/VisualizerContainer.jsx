import React from 'react';
import { connect } from 'react-redux';

import Visualizer from '../components/Visualizer';

const mapStateToProps = ({ labels, words, graphtitle, compare }) => ({
	labels, 
	words,
	graphtitle,
	compare
});

export default connect(mapStateToProps)(Visualizer);