import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';


class Navbar extends React.Component {

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
        <a className="navbar-brand" href="#">paraGraphic</a>
      </div>

      {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
      <div className="myNavBar collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              Examples <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              {
                this.props.titles && this.props.titles.map((title, idx) => (
                  <li key={idx}><Link to={`/${title.key}`}><span>{title.title}</span></Link></li>
                ))
              }
              <li><Link to="/sample1">Accelerate Manifesto</Link></li>
              <li><Link to="/sample2">Obama 2008 inaug. v Trump 2016 RNC accept.</Link></li>
              <li><Link to="/examples">Check out what other people have made!</Link></li>
            </ul>
          </li>
        </ul>
      </div>{/*<!-- /.navbar-collapse -->*/}
    </div>{/*<!-- /.container-fluid -->*/}
  </nav>
      );
  }
}

const mapState = ({titles}) => ({titles});

export default connect(mapState, null)(Navbar);