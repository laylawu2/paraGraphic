import React from 'react'
import { connect } from 'react-redux'
import Sample from '../components/Sample'

const mapStateToProps = ({ labelsLarge, words, text2 }) => ({
	labelsLarge, 
	words,
	text2
});

export default connect(mapStateToProps)(Sample)