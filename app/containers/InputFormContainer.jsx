import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { loadLabels, updatePageStatus } from '../reducers/inputForm';
import { getWords, getTitle, setCompare } from '../reducers/visualizer';
import InputForm from '../components/InputForm';

const mapStateToProps = ({ entry, labels }) => ({ entry, labels });

const mapDispatchToProps = dispatch => ({
  addTitle: (graphtitle)=>{
      dispatch(getTitle(graphtitle));
  },

	postAndGetWordData: (input) => {                            // axios call to python server
    return axios.post('http://localhost:1337/PCA', input)    	// returns the plottable points
      .then(res => {
        dispatch(getWords(res.data.words));
        dispatch(loadLabels(res.data));  
      })
      .catch(err => console.error(err))
	},

  updateStatus: (status) => {
    dispatch(updatePageStatus(status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);

