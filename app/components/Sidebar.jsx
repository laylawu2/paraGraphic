import React from 'react'
import InputForm from './InputForm'
import InputFormContainer from '../containers/InputFormContainer'

import RaisedButton from 'material-ui/RaisedButton';
// we will also need a component for info
export default class extends React.Component {
    constructor(props) {
        super(props)
        this.info = true;

    }


    render(){
        return(
            <div>
                {/* ternary to decide which of input or info to load*/}
                {this.props.loadinfo?
                    <div>
                        <h1>INFO FOR OUR APP</h1>
                        <p>with this app, you can... </p>

                        <RaisedButton type="submit" label="Input" primary={true} onClick={ () => { console.log("show input" ); this.props.Infofunc(false);  } } />
                    </div>
                    :
                    <div>
                        <InputFormContainer/>
                        <RaisedButton type="submit" label="Info" primary={true} onClick={ () => { console.log("show input" ); this.props.Infofunc(true);  } } />
                    </div>
                }

            </div>
        )

    }
}
