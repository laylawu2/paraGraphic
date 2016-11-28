import React from 'react'
import SampleOneTextContainer from '../containers/SampleOneTextContainer'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import {getWords, getCompText, getTitle} from '../reducers/visualizer'
import {loadLabelsLarge} from '../reducers/inputForm'




export default ({}) => (
  <SampleOneTextContainer />
)