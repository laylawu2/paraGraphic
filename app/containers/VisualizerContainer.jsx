import React from 'react'
import { connect } from 'react-redux'
import Visualizer from '../components/Visualizer'

const mapStateToProps = ({ labels, words, title, text2, compare}) => ({
	labels, 
	words,
	title,
	text2,
	compare
});

export default connect(mapStateToProps)(Visualizer)