import React from 'react';

import GraphicContainer from '../containers/GraphicContainer';
import DrawerContainer from '../containers/DrawerContainer';

// main application page with containers for two components: Graphic (which renders our image) and 
// Drawer (which toggles between app info and the user input form)
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

