import React from 'react';

import VisualizerContainer from '../containers/VisualizerContainer';
import DrawerContainer from '../containers/DrawerContainer';

// main application page with containers for two components: Graphic (which renders our image) and
// Drawer (which toggles between app info and the user input form)
export default ({}) => (
	<div id = "home">
		<div className="col-lg-8">
            <VisualizerContainer />
		</div>
		<div className="col-lg-4">
			 <DrawerContainer />
		</div>
	</div>
);

