import React from 'react'
import firebase from 'firebase'
import axios from 'axios'
import {browserHistory} from 'react-router'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { loadLabels } from '../reducers/inputForm'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.labels =["Love&Hate", "Happy&Sad", "Good&Bad", "Best&Worst", "Clever&Stupid"]
  }

  componentDidMount(){

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

  submitForm(e){
    e.preventDefault()

    // get user's input and trim white spaces
    var x = e.target.x.value.split('&');
    var y = e.target.y.value.split('&');
    var z = e.target.z.value.split('&');
    const userInput = {
      x: [x[0], x[1]],
      y: [y[0], y[1]],
      z: [z[0], z[1]],
      text: e.target.text.value,
      title: e.target.graphtitle.value
    }
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
    console.log("title----",e.target.graphtitle.value);
    this.props.addTitle(e.target.graphtitle.value);
    this.props.addLabels(userInput);
    this.props.postAndGetWordData(userInput)      // call function to post request to python server
      //.then(browserHistory.push('/tmp'));         // redirect to visualizer

  }

  render(){
    //onSubmit={(this.submitForm }
       // <input type='text' name='graphtitle'></input>
    return(

    <form  onSubmit={this.submitForm }>
      <h1>USER INPUT</h1>
      <div className='form-group'>
        <TextField hintText="TITLE" name='graphtitle' underlineFocusStyle={{borderColor: '#ff9800'}}/>
      </div>
      <div className='form-group'>
        <label>X: </label>
        <select className="selectpicker" name="x">
          {
            this.labels.map((label,idx) => (
              <option key={idx} value={label} >{label}</option>
            ))
          }
        </select>
      </div>
      <div className='form-group'>
        <label>X: </label>
        <select className="selectpicker"  name="y">
          {
            this.labels.map((label,idx) => (
              <option key={idx} value={label} >{label}</option>
            ))
          }
        </select>
      </div>
      <div className='form-group'>
        <label>X: </label>
        <select  className="selectpicker" name="z">
          {
            this.labels.map((label,idx) => (
              <option key={idx} value={label} >{label}</option>
            ))
          }
        </select>
      </div>
      <div className='form-group'>
        <label>text to analyze </label>
        <textarea  rows="5" name='text'></textarea>
      </div>
      <RaisedButton  backgroundColor="#a4c639" type="submit" label="See My Graph" primary={true}   />

    </form>)
  }

}