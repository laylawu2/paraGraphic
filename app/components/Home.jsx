import React from 'react';

import GraphicContainer from '../containers/GraphicContainer';
import SidebarContainer from '../containers/SidebarContainer';

export default ({}) => (
	<div>
		<div className="col-lg-4">
			<SidebarContainer />
		</div>
		<div className="col-lg-8">
			<GraphicContainer />
		</div>
	</div>
);

