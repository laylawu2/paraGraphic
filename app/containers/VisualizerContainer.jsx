import React from 'react'
import { connect } from 'react-redux'
import Visualizer from '../components/Visualizer'

const mapStateToProps = ({ words }) => {

	console.log("mapstatetoprops", words)
return ({
	words
});
}
// const mapDispatchToProps = (dispatch) => ({

// })

export default connect(mapStateToProps)(Visualizer)