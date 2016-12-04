import React from 'react';

import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import InputFormContainer from '../containers/InputFormContainer';

// code for the "drawer" component that expands on right-hand side of the app
const positionMe = {
    position: 'absolute',
    zIndex: 1,
    marginTop: 0
}

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    this.info = true;

  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    const { loadinfo, Infofunc } = this.props
    return (
      <div>
        {/* button on main page which shows drawer when clicked */}     
        <RaisedButton
          className="infoButton"
          label="info"
          onTouchTap={this.handleToggle}
          style={positionMe}
        />
        <Drawer className="drawer" width={400} openSecondary={true} open={this.state.open} >
            <div>
                {/* button on drawer which hides draw when clicked */}
                <FlatButton
                    backgroundColor="#FFFFF"
                    hoverColor="#8AA62F"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>}
                    style={{margin: 12}}
                    onClick={this.handleToggle}
                />
                {/* ternary to decide which of input or info to load*/}
                {
                    loadinfo?
                    <div>
                        <InputFormContainer/>
                    {/* button to toggle drawer component text between App info & input form */}
                        <RaisedButton fullWidth={true} type="submit" label="Info" primary={true} onClick={ () => { console.log("show input" ); Infofunc(false);  } } />
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
                            word groups represented by the graph's axes.
                        </p>
                        <p>
                            paraGraphic uses Google's word2vec, a powerful natural language processor that "learns"
                            contextual relationships between words based on their occurrence in
                            a large volume of training material. In paraGraphic's text analysis, word2vec provides a
                            300-dimensional vector equivalence for each word.  Then, paraGraphic uses scikit-learn's
                            principal component analysis function to reduce the 300-d vectors to the three dimensions
                            that contain the most variation in the data (in our case, the word vectors).
                        </p>
                        <p> 
                            Check out our examples or visualizations made by others in the drop-down list
                            on the navbar, or select "input" to enter a text of your choosing!
                        </p>
                        
                     {/* button to toggle drawer component text between App info & input form */}
                        <RaisedButton fullWidth={true}  type="submit" label="Input" primary={true} onClick={ () => { console.log("show input" ); Infofunc(true);  } } />
                    </div>
                }
            </div>
        </Drawer>
      </div>
    );
  }
}