# Sidebar
- State changes
    - pageStatus
    	- loading: Loading bar comp should appear
    	- ready: info page should appear
    	- on initial page load: should be loading
    - loadinfo
    	- true: info page should appear
    	- false: input form should appear
- Input form
	- required fields: title, text area

# Visualizer
- elements
	- should have a div with id 'container'
	- should have children with ids 'text' and 'graph-title'
- lifecycle
	- should call this.props.updateStatus('ready') everytime the component finishes updating
	- should call this.init() everytime the component updates
- event listeners
	- mousemove?: raycaster --> test for children in text div
	- resize: window resizing
- state changes
	- pageStatus
		- ready
			- should have children of canvas inside div id="container"
			- should have children (text) inside div id="graph-title"

# Graphic
- lifecycle
	- componentDidMount
		- should call getSample
	- render
		- should render VisualizerContainer

# Input form
- required fields
	- title
	- text area
- user interaction
	- on click submit button
		- should change state 
			- pageStatus: loading
		- should call addTitle with correct graph title
		- should call postAndGetWordData with correct user input
- state changes
	- pageStatus
		- ready: x, y, z fields should be filled with correct labels

# Loading
- state changes
	- pageStatus
		- loading: this component should be called

# Navbar
- user interaction
	- menu item onclicks
		- should render the right samples (check for methods called?)
		- should redirect to correct page (other user input examples)
