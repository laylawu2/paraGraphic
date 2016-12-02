import React from 'react'

import LinearProgress from 'material-ui/LinearProgress'
import LinearProgressExampleDeterminate from './progressbar'

import VisualizerContainer from '../containers/VisualizerContainer'

const styles = {
  progress: {
    marginTop: '10px'
  }
}

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
			<div>
				<LinearProgressExampleDeterminate />
				<LinearProgress mode="indeterminate" style={ styles.progress } />
        		<VisualizerContainer />
			</div>
		)
	}
}