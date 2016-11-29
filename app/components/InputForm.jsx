'use strict';
import React from 'react'
import axios from 'axios'
import {browserHistory} from 'react-router'
import firebase from 'firebase'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {orange500, blue500} from 'material-ui/styles/colors';
import { loadLabels } from '../reducers/inputForm'

const styles = {
  margin: 12,
  underlineStyle: {
    borderColor: orange500,
  }
};
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {xmin: [], ymin: [], zmin: [], xmax: [], ymax: [], zmax: []};
    this.submitForm = this.submitForm.bind(this)
  }

  submitForm(e){
    e.preventDefault()
    const { addTitle,addLabels, postAndGetWordData} = this.props;

    var xmin = e.target.xmin.value.split(" ");
    var xmax = e.target.xmax.value.split(" ");
    var ymin = e.target.ymin.value.split(" ");
    var ymax = e.target.ymax.value.split(" ");
    var zmin = e.target.zmin.value.split(" ");
    var zmax = e.target.zmax.value.split(" ");


    const userInput = {
      x: [xmin, xmax],
      y: [ymin, ymax],
      z: [zmin, zmax],
      text: e.target.text.value,
      title: e.target.graphtitle.value
    }

    console.log(userInput, "USER INPUT OBBBBBJEEEEECCCCCTTTTTTTT")

    // y: [e.target.ymin.value.trim(), e.target.ymax.value.trim()],
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

    console.log("title----",e.target.graphtitle.value);
    addTitle(e.target.graphtitle.value);
    addLabels(userInput);
    postAndGetWordData(userInput)      // call function to post request to python server
      //.then(browserHistory.push('/tmp'));         // redirect to visualizer


  }


  render(){
    return(
    <form className='form-inline' onSubmit={this.submitForm }>
      <h4>DETAILS FOR YOUR 3D VISUALIZATION</h4>
      <div className='form-group'>

        <TextField hintText="please enter a title for your graph" name='graphtitle'/>
      </div>
      <div>
        <p>
          Below, enter the key words that will mark the endpoints for the axes on your graphs.  You 
          can enter just one word per endpoint, but you will probably get better results if you enter
          several related words for each endpoint.
        </p>
      </div>
      <div className='form-group full-width'>
        <TextField className='axis-labels' floatingLabelText="x-min; separate words with a space" name='xmin'/>
        <TextField className='axis-labels' floatingLabelText="x-max; separate words with a space" name='xmax'/>
      </div>
      <div className='form-group full-width'>
        <TextField className='axis-labels' floatingLabelText="y-min; separate words with a space" name='ymin'/>
        <TextField className='axis-labels' floatingLabelText="y-max; separate words with a space" name='ymax'/>
      </div>
        <div className='form-group full-width'>
        <TextField className='axis-labels' floatingLabelText="z-min; separate words with a space" name='zmin'/>
        <TextField className='axis-labels' floatingLabelText="z-max; separate words with a space" name='zmax'/>
      </div>
      <div className='form-group full-width'>
        <TextField
          name='text'
          floatingLabelText="TEXT TO ANALYZE"
          multiLine={true}
          fullWidth ={true}
          rows={6}
          rowsMax={6}
          style = {{overflow: scroll}}
        />
      </div>
      <div>
        <RaisedButton type="submit" label="SUBMIT" style={styles} />
      </div>
    </form>)
  }

}