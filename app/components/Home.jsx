import React from 'react'
import SidebarContainer from '../containers/SidebarContainer'
import Graphic from './Graphic'
import VisualizerContainer from '../containers/VisualizerContainer'

export default ({}) => (
	<div>
		<div className="col-lg-4">
			<SidebarContainer />
		</div>
		<div className="col-lg-8">
			<VisualizerContainer />
		</div>

	</div>
)