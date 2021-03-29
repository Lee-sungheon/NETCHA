import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './common/store';
// import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./home/container/Home";
import MovieFilter from "./moviefliter/container/MovieFilter";
import Header from "./navbar/container/Header";
import Footer from './navbar/container/Footer';
import LikeList from "./likeList/container/LikeList";
import SearchList from "./navbar/container/SearchList";
import EmptyPage from "./common/EmptyPage";
import "./App.scss";
import Evaluation from "./evaluation/container/Evaluation";
import Account from "./user/container/Account";
import Login from "./user/container/Login";
import TestMbti from "./mbti/container/TestMbti";
import Signup from "./user/container/Signup";
import SignupDetail from "./user/container/SignupDetail";
import ProfileList from "./user/container/ProfileList";
import MbtiResult from "./mbti/container/MbtiResult";

// const history = createBrowserHistory();
function App() {
  const [isHeader, setIsHeader] = useState(true);

  const toggleIsHeader = (e) => {
    setIsHeader(e);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Provider store={store}>
          {isHeader ? <Header /> : null}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/movielist">
              <MovieFilter />
            </Route>
            <Route path="/search" component={SearchList} />
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
            <Route path="/testmbti">
              <TestMbti toggleIsHeader={toggleIsHeader} />
            </Route>
            <Route path="/mbtiresult">
              <MbtiResult toggleIsHeader={toggleIsHeader} />
            </Route>
            
            <Route>
              <EmptyPage />
            </Route>
          </Switch>
        </Provider>
        {isHeader ? <Footer /> : null}
      </div>
    </BrowserRouter>
  );
}


export default App;
