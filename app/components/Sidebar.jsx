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
            <div>
                {/* ternary to decide which of input or info to load*/}
                {loadinfo?
                    <div>
                        <h1>INFO FOR OUR APP</h1>
                        <p>with this app, you can... </p>

                        <RaisedButton type="submit" label="Input" primary={true} onClick={ () => { console.log("show input" ); Infofunc(false);  } } />
                    </div>
                    :
                    <div>
                        <InputFormContainer/>
                        <RaisedButton type="submit" label="Info" primary={true} onClick={ () => { console.log("show input" ); Infofunc(true);  } } />
                    </div>
                }

            </div>
        )

    }
}
