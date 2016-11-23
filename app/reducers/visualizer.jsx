import axios from 'axios'

const reducer = (state=null, action) => {
  switch(action.type) {
    case GET_WORDS:
      return action.words 
  }
  return state
};

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
        const action = getWords(res.data);
        return dispatch(action);
      })
      .catch(console.error);
  };
};

export default reducer;