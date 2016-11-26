import React from 'react'
import {Link} from 'react-router'


export default class Navbar extends React.Component {

render () {
return (
        <nav id="myNavBar" className="navbar  navbar-static-top">
  <div className="container-fluid">
    {/* <!-- Brand and toggle get grouped for better mobile display --> */}
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#">VisualText</a>
    </div>

    {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>

      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">examples <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <Link to="/s1">Action</Link>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" className="divider"></li>
            <Link to="/sample">Obama 2008 inaug. v Trump 2016 RNC accept.</Link>
          </ul>
        </li>
      </ul>
    </div>{/*<!-- /.navbar-collapse -->*/}
  </div>{/*<!-- /.container-fluid -->*/}
</nav>
    )
}
}
