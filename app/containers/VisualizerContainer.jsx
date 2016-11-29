import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Visualizer from '../components/Visualizer'
import { getWords, getCompText, setCompare } from '../reducers/visualizer'
import { loadLabels } from '../reducers/inputForm'
import { cleanScene } from '../reducers/visualizer'


const mapStateToProps = ({ labels, words, graphtitle, text2, compare, clearSceneBool, loadinfo }) => ({
	labels, 
	words,
	graphtitle,
	text2,
	compare,
	clearSceneBool, 
	loadinfo
});

const mapDispatchToProps = (dispatch) => ({
	clearScene: (toClear) => {
    console.log("mapDispatchToProps". toClear)
    dispatch(cleanScene(toClear));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer)