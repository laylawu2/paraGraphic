// import React from 'react';
// import { mount, shallow } from 'enzyme';
// import {expect} from 'chai';

// import Drawer from '../app/components/Drawer';

// describe('<Drawer />', function () {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = shallow(<Drawer />);
//   })
//   it('should have a div with className infoDiv', function () {
//     const wrapper = shallow(<Drawer />); // allows for shallow render of components to isolate one component for testing and ensure child components do not affect assertions
//     // console.dir(wrapper.props().children.props.children)
//     expect(wrapper.props().children.props.className).to.equal("infoDiv")
//     // expect(wrapper.find('img')).to.have.length(1);
//   });

//   it('should have props for email and src', function () {
//     const wrapper = mount(<Drawer />);
//     // wrapper.setState({ pageStatus: 'loading' });
//     console.log(wrapper.props());
//   });
// });