import axios from 'axios'
const GET_WORDS = 'GET_WORDS';

// action creator
export const getWords = words => ({
  type: GET_WORDS, 
  words
});

// reducer
export default (state={}, action) => {
  switch(action.type) {
    case GET_WORDS:
      return action.words 
  }
  return state
};