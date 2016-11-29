import React from 'react'
import { connect } from 'react-redux'
import { loadLabels } from '../reducers/inputForm'
import { getWords, getTitle, cleanScene } from '../reducers/visualizer'
import axios from 'axios'

import InputForm from '../components/InputForm'

const mapStateToProps = ({ clearSceneBool }) => ({
  clearSceneBool
})

const mapDispatchToProps = dispatch => ({
  clearScene: (toClear) => {
    console.log("mapDispatchToProps". toClear)
    dispatch(cleanScene(toClear));
  },

	addLabels: (labels) => {
		dispatch(loadLabels(labels));
	},
  
  addTitle: (graphtitle)=>{
      dispatch(getTitle(graphtitle));
  },

	postAndGetWordData: (input) => {                        // axios call to python server
    return axios.post('http://localhost:1337', input)    	// returns the plottable points
      .then(res => dispatch(getWords(res.data)))
      .catch(err => console.error(err))
  	}
});

export default connect(mapStateToProps, mapDispatchToProps)(InputForm)

