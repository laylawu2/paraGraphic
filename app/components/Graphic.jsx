import React from 'react';

import VisualizerContainer from '../containers/VisualizerContainer';

const styles = {
  progress: {
    marginTop: '10px'
  }
};

export default class Graphic extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getSample();
	}

	render() {
		return (
			<div>
        		<VisualizerContainer />
			</div>
		);
	}
}