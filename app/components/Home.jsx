import React from 'react';

import GraphicContainer from '../containers/GraphicContainer';
import DrawerContainer from '../containers/DrawerContainer';

export default ({}) => (
	<div>
		<div className="col-lg-8">
            <GraphicContainer />

		</div>
		<div className="col-lg-4">
			 <DrawerContainer />
		</div>
	</div>
);

