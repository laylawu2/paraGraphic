import React from 'react'

import VisualizerContainer from '../containers/VisualizerContainer'
import InputFormContainer from '../containers/InputFormContainer'

export default class extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    console.log('rendering singlelinkcomponent')
    return(
      <div>
        <div className="col-lg-4">
          <InputFormContainer />
        </div>
        <div className="col-lg-8">
          <VisualizerContainer />
        </div>
      </div>

    )
  }
}


