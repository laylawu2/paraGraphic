import React from 'react'
import { connect } from 'react-redux'
import SampleCompText from '../components/SampleCompText'

const mapStateToProps = ({ labels, words, text2 }) => ({
	labels, 
	words,
	text2
});

export default connect(mapStateToProps)(SampleCompText)