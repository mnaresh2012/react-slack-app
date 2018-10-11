import React from 'react';
import SendMessageForm from './SendMessageForm';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

Enzyme.configure({ adapter: new Adapter() });


describe('Test suites for  <SendMessageForm /> Component', () => {
    it('should render SendMessageForm component', () => {
        const comp = shallow(<SendMessageForm />);
        expect(comp.length).to.equal(1);
    });

    it('should render all elements in <SendMessageForm />', () => {
        const comp = shallow(<SendMessageForm />);
        expect(comp.find('form')).to.have.lengthOf(1);
        expect(comp.find('input')).to.have.lengthOf(1);
    });
});
