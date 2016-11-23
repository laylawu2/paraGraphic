'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import App from './components/App'
import VisualizerContainer from './containers/VisualizerContainer'
import InputFormContainer from './containers/InputFormContainer'
// load an example to start 




// // dispatch thunk to get words data 
// const onVisEnter = () => {
//   // const thunk = loadWords();
//   store.dispatch(loadWords());
// }





render (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRedirect to="/tmp" />
        <Route path="tmp" component={ VisualizerContainer } />
        <Route path="input" component={ InputFormContainer } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)