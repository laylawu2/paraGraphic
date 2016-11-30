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
import SampleOneTextContainer from './containers/SampleOneTextContainer'
import {getWords, getCompText, getTitle, getTitles} from './reducers/visualizer'
import {loadLabelsLarge} from './reducers/inputForm'
import { loadLabels } from './reducers/inputForm'

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

//onEnter for SampleContainer --

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var data, title, entry, t2;
var titlesFromDb=[];
const onAppEnter = () => {
  firebase.database().ref('/').once('value').then(function(snapshot) {
    data = snapshot.val()
    for (var groupID in data) {
      title = data[groupID].title
      if (title) {
        titlesFromDb.push(title)
      }
    }
    store.dispatch(getTitles(titlesFromDb))
    })
    .catch(err => console.error(err))
  // for (var groupID in data) {
  //     groupRef.child(data[groupID]).once(...)
  // }
}

const onSingleLinkEnter = (nextState) => {
  firebase.database().ref()
    .orderByChild('title')
    .startAt(nextState.params.title)
    .limitToLast(1)
    .once('child_added').then(function(snapshot) {
    entry = snapshot.val()
    console.log('onSingleLinkEnter loaded entry:', entry)
    store.dispatch(loadLabels(entry));
    console.log(JSON.stringify(entry, 0, 2))

    console.log('about to post', entry)
    axios.post('http://localhost:1337', entry)
    .then(res => {
      console.log('res in main', res.data)
      store.dispatch(getWords(res.data))

      // if(t2) {
      //   axios.post('http://localhost:1337', t2)
      //   .then(res =>{
      //     dispatch(getCompText(res.data));
      //     dispatch(setCompare("true"));
      //   })
      // }
    })
    .catch(err => console.error(err))
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
          <Route path=":title" component={ SampleOneTextContainer } onEnter={ onSingleLinkEnter }/>
        </Route>
      </Router>
    </Provider>
    </MuiThemeProvider>,
    document.getElementById('main')
)