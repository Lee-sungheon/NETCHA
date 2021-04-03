import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { rootSaga } from "./modules";
import { Provider } from "react-redux";
import createSagaMiddleware from "@redux-saga/core";
import { setUser } from './modules/user';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if(!user) return;

    store.dispatch(setUser(user));
  } catch(e) {
    console.log('로그인 에러');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
