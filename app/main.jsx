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
import ProjectsContainer from './containers/ProjectsContainer'

import { getTitles, getEntry, getVisInfo } from './reducers/visualizer'
import { loadInfofunc } from './reducers/inputForm'
import { fetchData } from './reducers/getData'

// onfigure and initialize firebase database to work with app
var config = {
  apiKey: "AIzaSyAYtUtOUzlgE-B50zlFX9JZs1OS_s3E-Sw",
  authDomain: "capstone-b9f6c.firebaseapp.com",
  databaseURL: "https://capstone-b9f6c.firebaseio.com",
  storageBucket: "capstone-b9f6c.appspot.com",
  messagingSenderId: "583702777619"
};

firebase.initializeApp(config);

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var data, title, entry, t2;

// get most recent 20 user-entered visualizations from database and make them
// available on the "projects" page
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
      entry = snap.val();

      if (!entry) {
        console.log('entry was null, will redirect')
        // Key not found, redirect
        replace({}, '/');
        return done();
      }
      // update entry to store
      store.dispatch(getEntry(entry));
      // fetch data with given entry to display
      store.dispatch(fetchData(entry));
      setTimeout(done, 113);
    })
}


render(
  <MuiThemeProvider >
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path="/" component={ App } onEnter={ onAppEnter }>
          <IndexRedirect to="/home" />
          <Route path="home" component={ Home } />
          <Route path="projects" component={ ProjectsContainer } />
          <Route path=":key" component={ Home } onEnter={ onSingleLinkEnterWithKey }/>
        </Route>
      </Router>
    </Provider>
    </MuiThemeProvider>,
    document.getElementById('main')
)