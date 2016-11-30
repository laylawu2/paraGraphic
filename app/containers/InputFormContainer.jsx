import React from 'react'
import { connect } from 'react-redux'
import { loadLabels } from '../reducers/inputForm'
import { getWords, getTitle, setCompare } from '../reducers/visualizer'
import axios from 'axios'

import InputForm from '../components/InputForm'

const mapDispatchToProps = dispatch => ({
	addLabels: (labels) => {
		dispatch(loadLabels(labels));
	},
  
  addTitle: (graphtitle)=>{
      dispatch(getTitle(graphtitle));
  },

	postAndGetWordData: (input) => {                        // axios call to python server
    return axios.post('http://localhost:1337', input)    	// returns the plottable points
      .then(res => {
        dispatch(getWords(res.data));
        if(Object.keys(res.data.text2).length > 1){
          console.log("HOUSTON, WE HAVE A SECOND TEXT")
          dispatch(setCompare("true"));
        }
        })
      .catch(err => console.error(err))
  	}
});

export default connect(null, mapDispatchToProps)(InputForm)

