import React from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import injectTapEventPlugin from 'react-tap-event-plugin';


// export default (

//   ({ children }) =>{
//       }
// )

export default class App extends React.Component {
	constructor(props) {
		super(props);
        injectTapEventPlugin();
		
	}
	
	render() {
		return (
			<div>
      	<Navbar/>
        	{ this.props.children }
      </div>
		)
	}
}