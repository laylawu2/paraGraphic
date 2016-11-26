import axios from 'axios'
const GET_WORDS = 'GET_WORDS';
const GET_COMP_TEXT ='GET_COMP_TEXT'

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


//action creater for comparison text
export const getCompText = text2 => ({
	type: GET_COMP_TEXT,
	text2
})

//reducer 
export const text2Reducer = (state={}, action) => {
	switch(action.type) {
		case GET_COMP_TEXT:
			return action.text2
	}
	return state
}