import React from 'react'
import { connect } from 'react-redux'

import InputForm from '../components/InputForm'

const mapDispatchToProps = dispatch => ({
	addLabels: () => {
		const action = loadLabel();
		dispatch(action);
	}
});

export default connect(null, mapDispatchToProps)(InputForm)