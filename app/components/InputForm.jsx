'use strict';;
import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import firebase from 'firebase';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {orange500, blue500} from 'material-ui/styles/colors';
import { loadLabels } from '../reducers/inputForm';
import {ButtonClose} from './Buttons'

const styles = {
  margin: 12,
  underlineStyle: {
    borderColor: orange500,
  }
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {xmin: [], ymin: [], zmin: [], xmax: [], ymax: [], zmax: []};
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    this.props.updateStatus('loading');

    e.preventDefault();
    var span = document.getElementById("alert");
    if(e.target.graphtitle.value =="" ) {
      span.innerHTML = "Title cannot be null!";
    } else if(e.target.text.value =="") {
        span.innerHTML = "Text cannot be null!";
    } else {
      span.innerHTML = "";
      const { addTitle, postAndGetWordData } = this.props;

      const userInput = {

        text: e.target.text.value,
       // text2: e.target.text2.value,
        title: e.target.graphtitle.value
      };

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
      postAndGetWordData(userInput);      // call function to post request to python server

      // if the title already exists, attach random str to the end of the title
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
      'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_'];

      const randStr = (length = 5) => {
        Array(length)
          .fill(0)
          .map((x, i) => letters[Math.floor(Math.random() * letters.length)])
          .join('');
      };

      const write = (input, charsToAppend = 0) => {
        const key = charsToAppend
          ? `${input.title}_${randStr(charsToAppend)}`
          : input.title;

        const myRef = firebase.database().ref(key);

        return myRef
          .transaction(existing => existing === null? input : undefined)
          .then(({committed, snapshot}) => {
            if (!committed) {
              return write(input, charsToAppend + 1);
            }
            return key;
          })
      }; // const write
    } // else
  } // end of submitForm

  render() {
    const entry = this.props.entry;
    const labels = this.props.labels;
    return(
    <div>
      <div className='btn-close'>
        <ButtonClose />
        </div>
      <form className='form-inline' onSubmit={this.submitForm }>
        <h4>DETAILS FOR YOUR 3D VISUALIZATION</h4>
        <div className='form-group'>
          <TextField hintText="please enter a title for your graph" name='graphtitle' value={entry.title}/>
        </div>
        <div>
          <p>
            The text you enter is rendered in a 3D-graph where the x, y, and z axes represent the three vectors
            that cause the most variation in your data (the vectors for all the words in the text).  
            The three words closest to those axis-defining vectors will display below.  You can think about this 
            as the three axes representing the ideas that are most important to your text.  The x-axis represents 
            the most important idea, then y, then z.
          </p>
        </div>
        <div className='form-group full-width'>
         <TextField name='xmax' value={'x-axis: ' + labels.x.join(', ')} />
        </div>
        <div className='form-group full-width'>
          <TextField name='ymax' value={'y-axis: ' + labels.y.join(', ')} />
        </div>
          <div className='form-group full-width'>
          <TextField name='zmax' value={'z-axis: ' + labels.z.join(', ')} />
        </div>
        <div className='form-group full-width'>
          <TextField 
            name='text'
            floatingLabelText="TEXT TO ANALYZE"
            multiLine={true}
            fullWidth ={true}
            rows={5}
            rowsMax={5}
            style = {{overflow: scroll}}
            value={entry.text}
          />
          {/*  <TextField className='axis-labels'
            name='text2'
            floatingLabelText="OPTIONAL: comparison text"
            multiLine={true}
            fullWidth ={true}
            rows={5}
            rowsMax={5}
            style = {{overflow: scroll}}
          /> */}
        </div>
        <div>
          <span id = "alert" ></span>
        </div>
           <div>
              <RaisedButton type="submit" label="SUBMIT" style={ styles } />
            </div>
            <div>
              <RaisedButton
                backgroundColor="#FFFFFF"
                label = 'clear'
                style={{margin: 12}}
                onClick={()=>{this.state={
                  xmin: [], ymin: [], zmin: [], xmax: [], ymax: [], zmax: [], text:'', title:''
                }}}
              />
            </div>
          </form>
    </div>
    )
  }
}