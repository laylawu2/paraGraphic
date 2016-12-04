import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import InputForm from '../app/components/InputForm'

// # Input form
// - required fields
//   - title
//   - text area
// - user interaction
//   - on click submit button
//     - should change state 
//       - pageStatus: loading
//     - should call addTitle with correct graph title
//     - should call postAndGetWordData with correct user input
// - state changes
//   - pageStatus
//     - ready: x, y, z fields should be filled with correct labels


describe('Test suite for InputForm', () => {
  beforeEach(() => {
    // Prevent duplication
    wrapper = shallow(<InputForm
                        name={ 'Reign' }
                        age={ 26 } />);
  });

  it('InputForm should exist', () => {
    expect(wrapper).to.exist;
  });

  it('Correctly displays the user name and age in paragraphs wrapped under a parent div', () => {
    let wrapper = shallow(<InputForm
                              name={ 'Reign' }
                              age={ 26 } />);

    expect(wrapper.type()).to.equal('div');
    expect(wrapper.hasClass('user')).to.equal(true);

    let namePar = wrapper.childAt(0);
    expect(namePar.type()).to.equal('p');
    expect(namePar.hasClass('user__name')).to.equal(true);
    expect(namePar.text()).to.equal('Name: Reign');

    let agePar = wrapper.childAt(1);
    expect(agePar.type()).to.equal('p');
    expect(agePar.hasClass('user__age')).to.equal(true);
    expect(agePar.text()).to.equal('Age: 26');
  });
});

