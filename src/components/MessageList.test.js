import React from 'react';
import MessageList from './MessageList';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

Enzyme.configure({ adapter: new Adapter() });

const props = {
    messages: [{
        senderId: '0',
        text: 'Test Message 0'
      },
      {
        senderId: '1',
        text: 'Test Message 1'
      },
    ],
    currentUser: '2'
  };

  
describe('Test suites for  <MessageList /> Component', () => {
    it('should MessageList component render', () => {
        const wrapper = shallow(<MessageList {...props} />);
        expect(wrapper.length).to.equal(1);
    });

    it('should render messages', () => {
        const wrapper = shallow(<MessageList {...props} />);
        expect(wrapper.find('li')).to.have.lengthOf(2);
    });
});
