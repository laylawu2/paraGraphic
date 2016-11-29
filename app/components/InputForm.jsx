import React from 'react'
import axios from 'axios'
import {browserHistory} from 'react-router'
import firebase from 'firebase'

import { loadLabels } from '../reducers/inputForm'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
  }

  submitForm(e){
    e.preventDefault()

    // get user's input and trim white spaces
    const userInput = {
      x: [e.target.xmin.value.trim(), e.target.xmax.value.trim()],
      y: [e.target.ymin.value.trim(), e.target.ymax.value.trim()],
      z: [e.target.zmin.value.trim(), e.target.zmax.value.trim()],
      text: e.target.text.value
    }

    // myRef is how we can access table in firebase
    // userInput is an object derived from user's text entries which will be a) sent to database table
    // and b) sent to python server to be converted into plottable points

    const myRef = firebase.database().ref('/');
    const newRef = myRef.push(userInput);     // send user input to database

    const id = newRef.key;
    console.log("ID FROM FIRRREEEEBBBAAASSSEEEEEEEE", id)

                  // this is the database key for entry just pushed
    //***** WE STILL NEED TO DO SOMETHING WITH THE KEY!


    this.props.addLabels(userInput);
    this.props.postAndGetWordData(userInput)      // call function to post request to python server
      .then(browserHistory.push('/tmp'));         // redirect to visualizer

  }

  render(){
    return(
    <form onSubmit={ this.submitForm }>
      <div className='form-group'>
        <label>X: </label>
        <input type='text' name='xmin'></input>
        <input type='text' name='xmax'></input>
      </div>
      <div className='form-group'>
        <label>Y: </label>
        <input type='text' name='ymin'></input>
        <input type='text' name='ymax'></input>
      </div>
      <div className='form-group'>
        <label>Z: </label>
        <input type='text' name='zmin'></input>
        <input type='text' name='zmax'></input>
      </div>
      <div className='form-group'>
        <label>text to analyze: </label>
        <input type='text' name='text'></input>
      </div>
      <button type='submit'>See My Graph</button>
    </form>)
  }

}