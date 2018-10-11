import React from 'react';
import MembersList from './MembersList';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

Enzyme.configure({ adapter: new Adapter() });

const props = {
    members: ['member1', 'member2']
  };

  
describe('Test suites for <MembersList /> Component', () => {
    it('should render <MembersList /> component', () => {
        const comp = shallow(<MembersList {...props} />);
        expect(comp.length).to.equal(1);
    });

    it('should render component elements', () => {
        const comp = shallow(<MembersList {...props} />);
        expect(comp.find('li')).to.have.lengthOf(2);
    });
});
