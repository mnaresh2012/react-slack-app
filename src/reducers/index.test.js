const { createStore } = require('redux');
const appReducers = require('.');
const should = require('chai').should();

describe('Testnin reducers', function() {

  it('should GET_USERNAME', function() {
    const currState = {
        username: ''
    };

    const store = createStore(appReducers, currState);

    const action = {
      type: 'GET_USERNAME',
      username : 'nisith'
    };

    store.dispatch(action);
    store.getState().should.have.property('username').and.equal('nisith');
       store.getState().should.have.property('screen').and.equal('EntryScreen');
  });

  it('should SET_USERNAME', function() {

    const currState = {
        username: ''
    };

    const store = createStore(appReducers, currState);

    const action = {
      type: 'SET_USERNAME',
      username : 'nisith'
    };

    store.dispatch(action);
    store.getState().should.have.property('username').and.equal('nisith');
    store.getState().should.have.property('screen').and.equal('ChatScreen');
  });

  it('should LOGOUT_USER', function() {
    const currState = {
        username: ''
    };

    const store = createStore(appReducers, currState);

    const action = {
      type: 'LOGOUT_USER'
    };

    store.dispatch(action);
    store.getState().should.have.property('username').and.equal('');
    store.getState().should.have.property('screen').and.equal('');
  });
})
