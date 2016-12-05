import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import InputForm from '../app/components/InputForm';
import InputFormContainer from '../app/containers/InputFormContainer';

// # Input form
// - required fields
//   - title
//   - text area
// - user interaction
//   - on click submit button
//     - should change state 
//       - pageStatus: loading
//     - should call postAndGetWordData with correct graph title, and input
// - state changes
//   - pageStatus
//     - ready: x, y, z fields should be filled with correct labels


describe('Test suite for InputForm', () => {
  let wrapper;
  beforeEach(() => {
    // Prevent duplication
    wrapper = shallow(<InputForm
                        visInfo={ {
                          words: {
                            rush: [0.5, 0.1, 0.2],
                            fruit: [0.1, 0.9, 0.1],
                            white: [0.5, 0.3, 0.6]
                          },
                          labels: {
                            x: ['time', 'space', 'clock'],
                            y: ['apple', 'banana'],
                            z: ['health']
                          },
                          graphtitle: 'new study'
                        } }
                        entry={ {
                          title: 'new study',
                          text: 'rush fruit and a white clock'
                        } } />);
  });

  it('InputForm should exist', () => {
    expect(wrapper).to.exist;
  });

  it('Correctly displays data in props in the form when pageStatus is ready', () => {

    // console.log(wrapper.props().children.props);
    // wrapper.find('div').forEach((child) => console.log(child.props()))
    expect(wrapper.find({name: 'text'}).props().value).to.equal('rush fruit and a white clock');
    expect(wrapper.find({name: 'graphtitle'}).props().value).to.equal('new study');

    let x = wrapper.find({id: 'form1'}).props().children, // x axis info in form
        y = wrapper.find({id: 'form2'}).props().children, // y axis info in form
        z = wrapper.find({id: 'form3'}).props().children; // z axis info in form

    expect(x[0]).to.equal('x-axis');
    expect(y[0]).to.equal('y-axis');
    expect(z[0]).to.equal('z-axis');
    expect(x[1].props.children[0]).to.equal('time, space, clock');
    expect(y[1].props.children[0]).to.equal('apple, banana');
    expect(z[1].props.children[0]).to.equal('health');
    
  });

  it('click: submit button', () => {
    let newEvt = {
      target: {
        text: {
          value: 'testing click event'
        },
        graphtitle: {
          value: 'new title'
        }
      }
    }

    // function onSubmit(evt  = newEvt) {

    // }

    wrapper.find({type: 'submit'}).simulate('click');
    wrapper.props().children.props.children.forEach((child) => console.log(child.props));
    // pageStatus should change to loading
    expect(wrapper.props)
    // should call postAndGetWordData with correct graph title and user input
  })
});

