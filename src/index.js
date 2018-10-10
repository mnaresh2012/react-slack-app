import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import App from './App';
import Reducers from './reducers';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(Reducers, {
    screen : ''
}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

//application bootstraping
ReactDOM.render((<Provider store={store}>
    <App />
</Provider>), document.getElementById('root'));
