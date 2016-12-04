import axios from 'axios';
const GET_VIS_INFO = 'GET_VIS_INFO';
const GET_TITLES = 'GET_TITLES';
const GET_ENTRY = 'GET_ENTRY';

// visInfo = {words: {word: [x, y, z]}, labels: {x, y, z}, graphtitle}
// the visualization info that is returned from server after analyzing text data
export const getVisInfo = (visInfo) => ({
  type: "GET_VIS_INFO",
  visInfo
});

// reducer to update store with visualization info received
export const visReducer = (state = {words: {}, labels: {}, graphtitle: ""}, action) => {
  switch(action.type) {
    case "GET_VIS_INFO":
      return action.visInfo;
  }
  return state;
}

export const getTitles = (titlesFromDb) => ({
  type: GET_TITLES,
  titlesFromDb
})

export const titlesReducer = (state=[], action) => {
  switch(action.type) {
    case GET_TITLES:
      return action.titlesFromDb
  }
  return state
}

export const getEntry = (entry) => ({
  type: GET_ENTRY,
  entry
})

export const entryReducer = (state={}, action) => {
  switch(action.type) {
    case GET_ENTRY:
      return action.entry
  }
  return state
}