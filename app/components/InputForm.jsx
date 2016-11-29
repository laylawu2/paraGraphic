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
import { loadLabels } from '../reducers/inputForm'
const style = {
  margin: 12,
};

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {x: "Love&Hate", y:"Love&Hate", z:"Love&Hate"};
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
    const { addTitle,addLabels, postAndGetWordData} = this.props;
    // get user's input and trim white spaces
    // var x = e.target.x.value.split('&');
    // var y = e.target.y.value.split('&');
    // var z = e.target.z.value.split('&');
    var x = this.state.x.split('&');
    var y = this.state.y.split('&');
    var z = this.state.z.split('&');
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
    addTitle(e.target.graphtitle.value);
    addLabels(userInput);
    postAndGetWordData(userInput)      // call function to post request to python server
      //.then(browserHistory.push('/tmp'));         // redirect to visualizer

  }
  handleChangex = (event, index, value) => this.setState({x:value});
  handleChangey = (event, index, value) => this.setState({y:value});
  handleChangez = (event, index, value) => this.setState({z:value});

  render(){
    return(
    <form  onSubmit={this.submitForm }>
      <h1>USER INPUT</h1>
      <div className='form-group'>
        <TextField hintText="TITLE" name='graphtitle'/>

      </div>

      <div className='form-group'>
        <SelectField floatingLabelText="X Lable" value={this.state.x} name="x" onChange={this.handleChangex} >
          {
            this.labels.map((label,idx) => (
              <MenuItem key={idx} value={label} primaryText= {label}/>
            ))
          }
        </SelectField>
      </div>
      <div className='form-group'>
        <SelectField floatingLabelText="Y Lable" value={this.state.y} name="y" onChange={this.handleChangey} >
          {
            this.labels.map((label,idx) => (
              <MenuItem key={idx} value={label} primaryText= {label}/>
            ))
          }
        </SelectField>
      </div>
      <div className='form-group'>
        <SelectField floatingLabelText="Z Lable" value={this.state.z} name="z" onChange={this.handleChangez} >
          {
            this.labels.map((label,idx) => (
              <MenuItem key={idx} value={label} primaryText= {label}/>
            ))
          }
        </SelectField>
      </div>
      <div className='form-group'>
        <TextField
          name='text'
          floatingLabelText="TEXT TO ANALYZE"
          multiLine={true}
          rows={4}
        />
      </div>
      <RaisedButton type="submit" label="SUBMIT" style={style} />

    </form>)
  }

}