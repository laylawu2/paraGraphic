'use strict';
import React from 'react'
import firebase from 'firebase'
import axios from 'axios'
import {browserHistory} from 'react-router'
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

  componentDidMount() {

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
  }

  submitForm(e) {
    e.preventDefault()
    var span = document.getElementById("alert");
    if(e.target.graphtitle.value =="" ){
      span.innerHTML = "Title cannot be null!";
    }else if(e.target.xmin.value ==""){
      span.innerHTML = "x-min cannot be null!";
    }else if(e.target.xmax.value ==""){
      span.innerHTML = "x-max cannot be null!";
    }else if(e.target.ymin.value ==""){
        span.innerHTML = "y-min cannot be null!";
    }else if(e.target.ymax.value ==""){
        span.innerHTML = "y-max cannot be null!";
    }else if(e.target.zmin.value ==""){
        span.innerHTML = "z-min cannot be null!";
    }else if(e.target.zmax.value ==""){
        span.innerHTML = "z-max cannot be null!";
    }else if(e.target.text.value ==""){
        span.innerHTML = "Text cannot be null!";
    }else{
      span.innerHTML =""
      const { addTitle,addLabels, postAndGetWordData } = this.props;

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
        text2: e.target.text2.value,
        title: e.target.graphtitle.value
      }

      // y: [e.target.ymin.value.trim(), e.target.ymax.value.trim()],
      // myRef is how we can access table in firebase
      // userInput is an object derived from user's text entries which will be a) sent to database table
      // and b) sent to python server to be converted into plottable points

      const myRef = firebase.database().ref('/');
      const newRef = myRef.push(userInput);     // send user input to database

      const id = newRef.key;
      console.log("ID FROM FIREBASE", id);
      // this is the database key for entry just pushed

      //***** WE STILL NEED TO DO SOMETHING WITH THE KEY! ******//

      // dispatch all input for values
      addTitle(e.target.graphtitle.value);
      addLabels(userInput);
      postAndGetWordData(userInput)      // call function to post request to python server

    }


  }


  render() {
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
        <TextField className='axis-labels'
          name='text'
          floatingLabelText="TEXT TO ANALYZE"
          multiLine={true}
          fullWidth ={true}
          rows={6}
          rowsMax={6}
          style = {{overflow: scroll}}
        />
          <TextField className='axis-labels'
          name='text2'
          floatingLabelText="OPTIONAL: comparison text"
          multiLine={true}
          fullWidth ={true}
          rows={6}
          rowsMax={6}
          style = {{overflow: scroll}}
        />
      </div>
      <div>
        <span id = "alert" ></span>
      </div>
      <div>
        <RaisedButton type="submit" label="SUBMIT" style={ styles } />
      </div>
    </form>)
  }

}