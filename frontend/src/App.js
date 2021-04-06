import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./common/store";
// import { createBrowserHistory } from 'history';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./home/container/Home";
import MovieFilter from "./moviefliter/container/MovieFilter";
import Header from "./navbar/container/Header";
import Footer from "./navbar/container/Footer";
import LikeList from "./likeList/container/LikeList";
import SearchList from "./navbar/container/SearchList";
import EmptyPage from "./common/EmptyPage";
import "./App.scss";
import Evaluation from "./evaluation/container/Evaluation";
import Account from "./user/container/Account";
import Login from "./user/container/Login";
import TestMbti from "./mbti/container/TestMbti";
import Mbti from "./mbti/container/Mbti";
import Signup from "./user/container/Signup";
import SignupDetail from "./user/container/SignupDetail";
import ProfileList from "./user/container/ProfileList";
import MbtiResult from "./mbti/container/MbtiResult";
import Movie from "./movie/container/Movie";
import cx from "classnames";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";

const persistor = persistStore(store);
// const history = createBrowserHistory();
function App() {
  const [isHeader, setIsHeader] = useState(true);
  const [toggleButton, setToggleButton] = useState(false);
  const [isLogin, setIsLogin] = useState("");
  // const isHeader_ = useSelector((state) => state.search.isHeader);
  const toggleIsHeader = (e) => {
    setIsHeader(e);
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className={cx("App", { "App--toggle": toggleButton })}>
            {/* {window.sessionStorage.getItem("token") ? ( */}
            <Header
              toggleButton={toggleButton}
              setToggleButton={setToggleButton}
            />
            {/* ) : null} */}
            <Route exact path="/">
              {window.sessionStorage.getItem("token") ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/login" />
              )}
              <Login />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Switch>
              <Route path="/home" component={Home} />
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

              <Route path="/signupdetail">
                <SignupDetail />
              </Route>
              <Route path="/profilelist">
                <ProfileList />
              </Route>
              <Route path="/testmbti">
                <TestMbti />
              </Route>
              <Route path="/mbtiresult">
                <MbtiResult />
              </Route>
              <Route path="/mbti">
                <Mbti />
              </Route>
              <Route path="/movie/:no" component={Movie}>
                {/* <Movie toggleIsHeader={toggleIsHeader} /> */}
              </Route>
              {/* <Route>
                <EmptyPage />
              </Route> */}
            </Switch>
            {isHeader ? <Footer /> : null}
          </div>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
