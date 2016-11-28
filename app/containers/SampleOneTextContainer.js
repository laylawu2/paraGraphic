import React from 'react'
import { connect } from 'react-redux'
import SampleOneText from '../components/SampleOneText'

const mapStateToProps = ({ labels, words, title }) => ({
	labels, 
	words,
	title
});

export default connect(mapStateToProps)(SampleOneText)