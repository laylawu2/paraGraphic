import React from 'react'
import { connect } from 'react-redux'
import Visualizer from '../components/Visualizer'

const mapStateToProps = ({ labels, words }) => {

	console.log("mapstatetoprops", words, labels)
return ({
	labels, 
	words
});
}

export default connect(mapStateToProps)(Visualizer)