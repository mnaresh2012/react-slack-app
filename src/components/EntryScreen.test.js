import React from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import EntryScreen from './EntryScreen';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';


Enzyme.configure({ adapter: new Adapter() });

const store = {
    getState: () => "",
    subscribe: () => '',
    dispatch: () => '',
}

describe('Test suites for  <EntryScreen /> Component', () => {
    it('should render form without errors', () => {
        const comp = shallow(<EntryScreen />);
        expect(comp.length).to.equal(1);
    });

    it('should render all elements in the component', () => {
        const comp = shallow(<EntryScreen />);
        expect(comp.find(Typography)).to.have.lengthOf(1);
        expect(comp.find(Input)).to.have.lengthOf(1);
        expect(comp.find(Button)).to.have.lengthOf(1);
       
    });

    it('should user change the username', () => {
        const comp = shallow(<EntryScreen />);
        comp.find(Input).simulate('change', {target: { value: 'changed username'}});
        expect(comp.state().username).to.equal('changed username');
    });

    
});
