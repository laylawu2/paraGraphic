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
    console.log('e', e)
    this.setState({
      xmin: e.target.xmin.value,
      xmax: e.target.ymax.value,
      ymin: e.target.ymin.value,
      ymax: e.target.ymax.value,
      zmin: e.target.zmin.value,
      zmax: e.target.zmax.value
    });
    console.log('this.state', this.state)
    const myRef = firebase.database().ref('/')
    const userInput = {
      x: [this.state.xmin, this.state.xmax],
      y: [this.state.ymin, this.state.ymax],
      z: [this.state.zmin, this.state.zmax],
      text: 'long strng of words'
    }
    const newRef = myRef.push(userInput)
    const id = newRef.key
    this.postAndGetWordData(userInput)
  }

  postAndGetWordData(input) {
    axios.post('/api', input)
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