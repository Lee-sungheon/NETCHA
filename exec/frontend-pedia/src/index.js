import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { rootSaga } from './modules';
import { Provider } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import { setUser } from './modules/user';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

function loadUser() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      store.dispatch(setUser({ seq: 11, nickname: 'Guest' }));
      alert('넷차로 로그인 후 이용해주세요');
    } else store.dispatch(setUser(user));

    // console.log('user!!!!!!')
    // console.dir(user);
  } catch (e) {}
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
