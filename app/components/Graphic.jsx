import React from 'react'
import VisualizerContainer from '../containers/VisualizerContainer'

export default class Graphic extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("graphic compoennt did mount")
		this.props.getSample();
	}

	render() {
		return (
			<VisualizerContainer />
		)
	}
}