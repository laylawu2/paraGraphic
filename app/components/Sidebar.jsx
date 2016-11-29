import React from 'react'
import InputForm from './InputForm'
import InputFormContainer from '../containers/InputFormContainer'

import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
// we will also need a component for info
export default class extends React.Component {
    constructor(props) {
        super(props)
        this.info = true;
        injectTapEventPlugin();

    }

    render(){
        const {loadinfo, Infofunc} = this.props
        return(
            <div >
                {/* ternary to decide which of input or info to load*/}
                { loadinfo?
                    <div>
                        <InputFormContainer/>
                        <RaisedButton fullWidth={true}  type="submit" label="Info" primary={true} onClick={ () => { console.log("show input" ); Infofunc(false);  } } />
                    </div>
                    :
                    <div className="infoDiv">
                        <h1>paraGraphic</h1>
                        <br/>
                        <p>
                            paraGraphic is a text visualization tool that lets you 
                            see relationships between words
                        </p>
                        <p>
                            paraGraphic will render a 3D model of any text -- just copy & paste
                            it into the input form.  The words in the text appear as spheres in 
                            a 3-dimensional graph, arranged according to their relationship to key 
                            words chosen as end points (labels) for the graph's axes.
                        </p>
                        <p>
                            paraGraphic uses Google's word2vec, a powerful natural language processor that
                            "learns" contextual relationships between words based on their occurrence in
                            a large volume of training material.

                        </p>
                        <p className="bold-text">  {/* NOTE: why is this not working? */}
                            Check out our examples or visualizations made by others in the drop-down list
                            on the navbar, or select "input" to enter a text of your choosing!  
                        </p>
                        <RaisedButton fullWidth={true}  type="submit" label="Input" primary={true} onClick={ () => { console.log("show input" ); Infofunc(true);  } } />
                        </div>
                }
            </div>
        )
    }
}
