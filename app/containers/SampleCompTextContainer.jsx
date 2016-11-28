import React from 'react'
import { connect } from 'react-redux'
import SampleCompText from '../components/SampleCompText'

const mapStateToProps = ({ labelsLarge, words, text2 }) => ({
	labelsLarge, 
	words,
	text2
});

export default connect(mapStateToProps)(SampleCompText)