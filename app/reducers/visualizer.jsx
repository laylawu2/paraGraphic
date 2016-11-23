import axios from 'axios'
const GET_WORDS = 'GET_WORDS';

// action creator
export const getWords = words => ({
  type: GET_WORDS, 
  words
});

export const loadWords = () => {
  return (dispatch) => {
    // get words from backend
    axios.get('/api/words')
      .then(res => {
        console.log("res.data", res.data);
        const action = getWords(res.data);
        return dispatch(action);
      })
      .catch(console.error);
  };
};

export default (state={}, action) => {
  switch(action.type) {
    case GET_WORDS:
    console.log("reducer", action.words);
      return action.words 
  }
  return state
};