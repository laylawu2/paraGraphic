import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import { cyan900 } from 'material-ui/styles/colors';

const style = {
  backgroundColor: cyan900
};

const linkToProjects = () => {
  browserHistory.push('/projects')
}

{/* define drop-down menu indicated by icon to display at right of navbar */}
class Examples extends Component { 
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><ExpandMoreIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem primaryText="Accelerate Manifesto" onClick={ this.props.getSample } />
        <MenuItem primaryText="Obama 2008 Inaugural Address" onClick={ this.props.getCompareSample } />
        <MenuItem primaryText="History" onClick={linkToProjects}/>
      </IconMenu>
    );
  }
}

Examples.muiName = 'IconMenu';


{/* navbar component, incorporates drop-down menu defined above */}
export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCompareSample();
  }

  render() {
    return (
      <div>
        <AppBar
          title="paraGraphic"
          showMenuIconButton={ false }
          iconElementRight={ <Examples { ...this.props } /> }
          style={ style }
        />
      </div>
    );
  }
}