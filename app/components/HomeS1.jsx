import React from 'react'

import Graphic from './Graphic'
import SampleOneTextContainer from '../containers/SampleOneTextContainer'
import SidebarContainer from '../containers/SidebarContainer'

export default ({}) => (
	<div>
		<div className="col-lg-4">
			<SidebarContainer />
		</div>
		<div className="col-lg-8">
			<SampleOneTextContainer />
		</div>
	</div>
)
