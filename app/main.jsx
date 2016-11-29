'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import axios from 'axios'

import store from './store'
import App from './components/App'
import Home from './components/Home'
import SidebarContainer from './containers/SidebarContainer'
import VisualizerContainer from './containers/VisualizerContainer'
import InputFormContainer from './containers/InputFormContainer'
import SampleOneTextContainer from './containers/SampleOneTextContainer'
import { getWords, getCompText, getTitle } from './reducers/visualizer'
import { loadLabels } from './reducers/inputForm'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


render (
<MuiThemeProvider >
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRedirect to="/home" />
        <Route path="home" component={ Home } />
        <Route path="tmp" component={ VisualizerContainer } />
        <Route path="input" component={ InputFormContainer } />
      </Route>
    </Router>
  </Provider>
  </MuiThemeProvider>,
  document.getElementById('main')
)