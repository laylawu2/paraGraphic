import React from 'react'

import Graphic from './Graphic'
import SampleTwoContainer from '../containers/SampleTwoContainer'
import SidebarContainer from '../containers/SidebarContainer'

export default ({}) => (
	<div>
		<div className="col-lg-4">
			<SidebarContainer />
		</div>
		<div className="col-lg-8">
			<SampleTwoContainer />
		</div>
	</div>
)
