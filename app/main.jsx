'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import axios from 'axios'
import firebase from 'firebase'
import store from './store'
import App from './components/App'
import Home from './components/Home'
import SidebarContainer from './containers/SidebarContainer'
import VisualizerContainer from './containers/VisualizerContainer'
import InputFormContainer from './containers/InputFormContainer'
import SingleLinkContainer from './containers/SingleLinkContainer'
import {getWords, getCompText, getTitle, getTitles, getEntry} from './reducers/visualizer'
import {loadLabels, loadInfofunc} from './reducers/inputForm'
import ProjectsContainer from './containers/ProjectsContainer'
// following code configures and initializes firebase database to work with app
// may eventually want to move this to React component for home page / landing page
// or even index.html if possible -- firebase should be working as soon as app starts
var config = {
  apiKey: "AIzaSyAYtUtOUzlgE-B50zlFX9JZs1OS_s3E-Sw",
  authDomain: "capstone-b9f6c.firebaseapp.com",
  databaseURL: "https://capstone-b9f6c.firebaseio.com",
  storageBucket: "capstone-b9f6c.appspot.com",
  messagingSenderId: "583702777619"
};

firebase.initializeApp(config);
// load an example to start

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var data, title, entry, t2;
const onAppEnter = () => {
  firebase.database().ref('/')
    .limitToLast(20)
    .once('value')
    .then(function(snapshot) {
    data = snapshot.val()
    var titlesFromDb=[];

    for (var groupID in data) {
      title = data[groupID].title
      if (title) {
        titlesFromDb.push({title, key: groupID})
      }
    }
    store.dispatch(getTitles(titlesFromDb))
    })
    .catch(err => console.error(err))
  }

const onSingleLinkEnterWithKey = (next, replace, done) =>{
  firebase.database().ref()
    .child(next.params.key)
    .once('value')
    .then(snap => {
      entry = snap.val()

      if (!entry) {
        console.log('entry was null, will redirect')
        // Key not found, redirect
        replace({}, '/')
        return done()
      }
      store.dispatch(getEntry(entry))
      store.dispatch(loadLabels(entry))
      axios.post('http://localhost:1337', entry)
        .then(res => {
          console.log('res.data', res.data);
          store.dispatch(getWords(res.data))
        })
        .then(done())
        .catch(() => replace('/'))
      setTimeout(done, 113)
    })
}

render(
  <MuiThemeProvider >
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path="/" component={ App } onEnter={ onAppEnter }>
          <IndexRedirect to="/home" />
          <Route path="home" component={ Home } />
          <Route path="tmp" component={ VisualizerContainer } />
          <Route path="input" component={ InputFormContainer } />
          <Route path="projects" component={ ProjectsContainer } />
          <Route path=":key" component={ SingleLinkContainer } onEnter={ onSingleLinkEnterWithKey }/>
        </Route>
      </Router>
    </Provider>
    </MuiThemeProvider>,
    document.getElementById('main')
)