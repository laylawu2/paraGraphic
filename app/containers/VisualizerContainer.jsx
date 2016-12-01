import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Visualizer from '../components/Visualizer'
import { getWords, setCompare } from '../reducers/visualizer'
import { loadLabels } from '../reducers/inputForm'

const mapStateToProps = ({ labels, words, graphtitle, compare }) => ({
	labels, 
	words,
	graphtitle,
	compare
});

export default connect(mapStateToProps)(Visualizer)