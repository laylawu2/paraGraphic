import axios from 'axios'
const GET_WORDS = 'GET_WORDS';

// action creator
export const getWords = words => ({
  type: GET_WORDS, 
  words
});


export default (state={}, action) => {
  switch(action.type) {
    case GET_WORDS:
    console.log("reducer", action.words);
      return action.words 
  }
  return state
};