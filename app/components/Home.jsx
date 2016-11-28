import React from 'react'
import Sidebar from './Sidebar'
import Graphic from './Graphic'

export default ({}) => (
	<div>
		<div className="col-lg-4">
			<Sidebar />
		</div>
		<div className="col-lg-8">
			<Graphic />
		</div>

	</div>
)