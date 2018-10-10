import React from 'react';
import App from './App';
import { createStore } from 'redux';
import AppReducers from './reducers';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

Enzyme.configure({ adapter: new Adapter() });

const store = {
    getState: () => "",
    subscribe: () => '',
    dispatch: () => ''
}

describe('Render <App /> Component', () => {
    it('should render App', () => {
        const app = shallow(<App store={store}/>);
        expect(app.length).to.equal(1);
    });
});
