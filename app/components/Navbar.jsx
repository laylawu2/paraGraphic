import React from 'react'
import {Link} from 'react-router'


export default class Navbar extends React.Component {

render () {
  return (
      
    <nav className="myNavBar navbar  navbar-static-top">
    <div className="myNavBar container-fluid">
    
      {/* <!-- Brand and toggle get grouped for better mobile display --> */}
      <div className="myNavBar navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">VisualText</a>
      </div>

      {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
      <div className="myNavBar collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Examples <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><Link to="/s1">Accelerate Manifesto</Link></li>
              <li><Link to="/sample">Obama 2008 inaug. v Trump 2016 RNC accept.</Link></li>
              <li><Link to="/examples">Check out what other people have made!</Link></li>
            </ul>
          </li>
        </ul>
      </div>{/*<!-- /.navbar-collapse -->*/}  
    </div>{/*<!-- /.container-fluid -->*/}
  </nav>  
      )
  }
}
