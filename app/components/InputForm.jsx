import React from 'react'
import firebase from 'firebase'
import axios from 'axios'
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      xmin: '',
      xmax: '',
      ymin: '',
      ymax: '',
      zmin: '',
      zmax: ''
    }
    this.submitForm = this.submitForm.bind(this)
    this.setState = this.setState.bind(this)

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
    this.setState({
      xmin: e.target.xmin.value,
      xmax: e.target.ymax.value,
      ymin: e.target.ymin.value,
      ymax: e.target.ymax.value,
      zmin: e.target.zmin.value,
      zmax: e.target.zmax.value
    });

    // myRef is how we can access table in firebase
    // userInput is an object derived from user's text entries which will be a) sent to database table
    // and b) sent to python server to be converted into plottable points

    const myRef = firebase.database().ref('/')
    const userInput = {
      x: [this.state.xmin, this.state.xmax],
      y: [this.state.ymin, this.state.ymax],
      z: [this.state.zmin, this.state.zmax],
      text: 'long strng of words'
    }
    const newRef = myRef.push(userInput)     // send user input to database
    const id = newRef.key                    // this is the database key for entry just pushed
    this.postAndGetWordData(userInput)       // call function to post request to python server
  }

  postAndGetWordData(input) {                        // axios call to python server
    axios.post('http://localhost:5000/api', input)   // returns the plottable points 
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  render(){
    return(
    <form onSubmit={this.submitForm}>
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

      <button type='submit'>See My Graph</button>
    </form>)
  }

}