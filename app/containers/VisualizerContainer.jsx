import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Visualizer from '../components/Visualizer'
import { getWords, getCompText, setCompare } from '../reducers/visualizer'
import { loadLabels } from '../reducers/inputForm'


const mapStateToProps = ({ labels, words, graphtitle, text2, compare }) => ({
	labels, 
	words,
	graphtitle,
	text2,
	compare
});

export default connect(mapStateToProps)(Visualizer)