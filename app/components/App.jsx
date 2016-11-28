import React from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'


export default (

  ({ children }) =>
    <div>
    	<Navbar/>
      	{ children }
    </div>
)