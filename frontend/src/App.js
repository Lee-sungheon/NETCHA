import React from "react";
import {Provider} from 'react-redux';
import store from './common/store';
// import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./home/container/Home";
import Header from "./navbar/container/Header";
import EmptyPage from "./common/EmptyPage";
import './App.css';

// const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Provider store={store}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route>
              <EmptyPage />
            </Route>
          </Switch>
        </Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
