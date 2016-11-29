import React from 'react'
import firebase from 'firebase'

export default class extends React.Component {

  render() {
    const myRef = firebase.database().ref('/');
    const newRef = myRef.push(userInput);     // send user input to database

    const id = newRef.key;
    console.log("ID FROM FIRRREEEEBBBAAASSSEEEEEEEE", id)
    // when a new child added, the store will update so will the titles in the links

    return(
      <div>
        Retrieve
      </div>
    )
  }
}