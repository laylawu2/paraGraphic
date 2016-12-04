import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { updatePageStatus } from '../reducers/inputForm';
import { getVisInfo } from '../reducers/visualizer';
import InputForm from '../components/InputForm';


// parts of store needed by connected component:  entry (data from Firebase, if any)
// and visInfo (visualization info returned from server)
const mapStateToProps = ({ entry, visInfo }) => ({ entry, visInfo });

const mapDispatchToProps = dispatch => ({

	postAndGetWordData: (input, title) => {                            // axios call to python server 
    return axios.post('http://localhost:1337/PCA', input)    	       // (via express server)
      .then(res => {                                                 // returns plottable points 
        dispatch(getVisInfo(                                         // and axis data;
          { words: res.data.words,                                   // dispatches returned data to
            labels: {                                                // update store
              x: res.data.axis1,
              y: res.data.axis2,
              z: res.data.axis3
            }, 
          graphtitle: title }          // updates title on store so it can be rendered with text model
        ));
      })
      .then(() => dispatch(updatePageStatus('ready')))
      .catch(err => console.error(err))
	},

  updateStatus: (status) => {
    dispatch(updatePageStatus(status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);

