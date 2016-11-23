import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'
import WhoAmI from './WhoAmI'

export default connect(
  ({ auth }) => ({ user: auth }) // mapStateToProps
)(
  ({ user, children }) =>
    <div>
      {/*
	    <nav>
	      {user ? <WhoAmI/> : <Login/>}
	    </nav>
        */}
      {children}
    </div>
)