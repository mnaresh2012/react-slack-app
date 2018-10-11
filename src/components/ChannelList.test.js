import React from 'react';
import ChannelList from './ChannelList';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

Enzyme.configure({ adapter: new Adapter() });

const props = {
    channels: [{
        id: '0',
        name: 'General',
        isPrivate: false
      },
	  {
        id: '1',
        name: 'Public',
        isPrivate: false
      }],
    currentChannelId: '1'
  };

  
describe('Test suites for <ChannelList /> Component', () => {
    it('should render without errors', () => {
        const comp = shallow(<ChannelList {...props} />);
        expect(comp.length).to.equal(1);
    });

    it('should render all elements in component', () => {
        const comp = shallow(<ChannelList {...props} />);
        expect(comp.find('div')).to.have.lengthOf(1);
        expect(comp.find('ul')).to.have.lengthOf(1);
        expect(comp.find('li')).to.have.lengthOf(2);
    });
});
