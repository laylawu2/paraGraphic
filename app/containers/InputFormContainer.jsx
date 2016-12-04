import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { updatePageStatus } from '../reducers/inputForm';
import { getVisInfo } from '../reducers/visualizer';
import InputForm from '../components/InputForm';

const mapStateToProps = ({ entry, visInfo }) => ({ entry, visInfo });

const mapDispatchToProps = dispatch => ({

	postAndGetWordData: (input, title) => {                            // axios call to python server
    return axios.post('http://localhost:1337/PCA', input)    	// returns the plottable points
      .then(res => {
        dispatch(getVisInfo(
          { words: res.data.words, 
            labels: {
              x: res.data.axis1,
              y: res.data.axis2,
              z: res.data.axis3
            }, 
          graphtitle: title }
        ));
        dispatch(updatePageStatus('ready')); 
      })
      .catch(err => console.error(err))
	},

  updateStatus: (status) => {
    dispatch(updatePageStatus(status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);

