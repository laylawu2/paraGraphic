import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import InputForm from '../components/InputForm';

// parts of store needed by connected component:  entry (data from Firebase, if any)
// and visInfo (visualization info returned from server)
const mapStateToProps = ({ entry, visInfo }) => ({ entry, visInfo });

const mapDispatchToProps = dispatch => ({
  // send user input and title to get data
	postAndGetWordData: (input, title) => dispatch(fetchData(input, title))

});

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);

