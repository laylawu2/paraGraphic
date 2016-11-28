import React from 'react'
import { connect } from 'react-redux'
import SampleOneText from '../components/SampleOneText'

const mapStateToProps = ({ labelsLarge, words, title }) => ({
	labelsLarge, 
	words,
	title
});

export default connect(mapStateToProps)(SampleOneText)