import React, {Component} from 'react';
import { Link } from 'react-router'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { cyan900 } from 'material-ui/styles/colors';

import { ACCEL, INPUT_BO, DRUMPF, fetchSample } from '../reducers/samples';

const style = {
  backgroundColor: cyan900
};


class Logged extends Component { 
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
        <MenuItem primaryText="Obama v Trump" onClick={ this.props.getCompareSample } />
        <MenuItem primaryText="History" />
      </IconMenu>
    );
  }
}
Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
export default class Navbar extends Component {
  render() {
    return (
      <div>
        {/*<Toggle
                  label="Logged"
                  defaultToggled={true}
                  onToggle={this.handleChange}
                  labelPosition="right"
                  style={{margin: 20}}
                />*/}
        <AppBar
          title="paraGraphic"
          showMenuIconButton={ false }
          iconElementRight={ <Logged { ...this.props } /> }
          style={ style }
        />
      </div>
    );
  }
}