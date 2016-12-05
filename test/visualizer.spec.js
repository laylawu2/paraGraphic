import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import Visualizer from '../app/components/Visualizer'

// event listeners
    // mousemove?: raycaster --> test for children in text div
    // resize: window resizing



describe('Test suite for Visualizer', () => {

      //     isInfo: {graphtitle:"Obama 2008 Inaugural Address",
      //            labels: {
      //               x:["hatered","religon","HUMAN_BEINGS"],
      //               y:["america","americans","usa"],
      //               z:["bood","Oooooh","dangit"]
      //            },
      //            words:{
      //               text1:[]
      //            }
      // }
  beforeEach(() => {
    // Prevent duplication
    let wrapper = shallow(<Visualizer/>);
  });

  it('Visualizer should exist', () => {
    expect(wrapper).to.exist;
  });

//   it('Should call this.props.updateStatus everytime the component finishes updating', () => {
//     sinon.spy(wrapper.prototype, 'updateStatus');
//     wrapper.setState({
//       entry: {

//           pageStatus: 'ready'

//       }
//     });
//     expect(wrapper.prototype.updateStatus.calledOnce).to.equal(true);

//     expect(wrapper.state().entry.pageStatus).to.equal('ready');
// });

//   it('Should call this.init() everytime the component updates', () => {
//     sinon.spy(wrapper, 'init');
//     wrapper.setState({
//       entry: {
//         {
//           pageStatus: 'ready'
//         }
//       }
//     });
//     expect(wrapper.init.calledOnce).to.equal(true);
//   });

//   it('', () => {
//     sinon.spy(wrapper, 'onMouseMove');

//     expect(wrapper.onMouseMove.calledOnce).to.equal(true);
//     let text = wrapper.childAt(2);
//     expect(title.type()).to.equal('p');
//   });


//   it('Correctly displays the title and text under a parent div', () => {


//     expect(wrapper.type()).to.equal('div');

//     let title = wrapper.childAt(0);
//     expect(title.type()).to.equal('h1');

//     let canvas = wrapper.childAt(1);
//     expect(canvas.type()).to.equal('canvas');

//     let text = wrapper.childAt(2);
//     expect(title.type()).to.equal('p');


//   });



});

