import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './common/store';
// import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home/container/Home';
import Header from './navbar/container/Header';
import LikeList from './likeList/container/LikeList';
import EmptyPage from './common/EmptyPage';
import './App.scss';
import Evaluation from './evaluation/container/Evaluation';
import Account from './User/container/Account';
import Login from './User/container/Login';
import Signup from './User/container/Signup';
import SignupDetail from './User/container/SignupDetail';
import ProfileList from './User/container/ProfileList';

// const history = createBrowserHistory();

function App() {
  const [isHeader, setIsHeader] = useState(true);

  const toggleIsHeader = (e) => {
    setIsHeader(e);
  };
  return (
    <BrowserRouter>
      <div className="App">
        {isHeader ? <Header /> : null}
        <Provider store={store}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/mylike">
              <LikeList />
            </Route>
            <Route path="/eval">
              <Evaluation />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/login">
              <Login toggleIsHeader={toggleIsHeader} />
            </Route>
            <Route path="/signup">
              <Signup toggleIsHeader={toggleIsHeader} />
            </Route>
            <Route path="/signupdetail">
              <SignupDetail toggleIsHeader={toggleIsHeader} />
            </Route>
            <Route path="/profilelist">
              <ProfileList />
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
