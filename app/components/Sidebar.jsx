import React from 'react'
import InputForm from './InputForm'

// we will also need a component for info

export default ({}) => (
	<div>
		{/* ternary to decide which of input or info to load*/}
		<button className="btn btn-info" onClick={ () => {} }>Info</button>
		<button className="btn btn-primary" onClick={ () => {} }>Input</button>
	</div>
)